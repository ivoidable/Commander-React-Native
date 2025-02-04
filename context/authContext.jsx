import { auth, db } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState, useContext } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuthenticated] = useState(undefined);


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setAuthenticated(true);
                updateUserData(user.uid);
            } else {
                setUser(null);
                setAuthenticated(false);
            }
        });
        return unsub;
    }, [])

    const updateUserData = async (userId) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            setUser({...user, username: data.username, userId: data.userId, profileUrl: data.profileUrl, commands: data.commands});
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true, data: response.user}
        } catch (e) {
            let msg = e.message
            if (msg.includes('(auth/invalid-email)')) msg = "Invalid Email Address";
            if (msg.includes('(auth/invalid-credential)')) msg = "Incorrect Email or Password";
            if (msg.includes('(auth/wrong-password)')) msg = "Incorrect Password";
            return {success: false, msg: msg}
        }
    }
    const logout = async () => {
        try {
            await signOut(auth);
            return {success: true}
        } catch (e) {
            return {success: false, msg: msg}
        }
    }

    const register  = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", response.user.uid), {
                username: username,
                profileUrl: profileUrl,
                userId: response.user.uid
            })
            await updateProfile(response.user, {displayName: username, photoURL: profileUrl});
            return {success: true, data: response.user}
        } catch (e) {
            let msg = e.message
            if (msg.includes('(auth/invalid-email)')) msg = "Invalid email address";
            if (msg.includes('(auth/email-already-in-use)')) msg = "Email already in use";
            if (msg.includes('(auth/weak-password)')) msg = "Password is خول, please use a stronger one";
            return {success: false, msg: msg}
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return value;
}