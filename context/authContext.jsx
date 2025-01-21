import { auth, db } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore";
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
            } else {
                setUser(null);
                setAuthenticated(false);
            }
        });
        return unsub;
    }, [])


    const login = async (email, password) => {
        try {

        } catch (e) {

        }
    }
    const logout = async () => {
        try {
            await logout(auth);
            return {success: true}
        } catch (e) {
            return {success: false, msg: msg}
        }
    }

    const register  = async (email, password, username, profileurl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("response.user: ", response.user);

            await setDoc(doc(db, "users", response.user.uid), {
                username,
                profileurl,
                userId: response.user.uid
            })
            return {success: true, data: response.user}
        } catch (e) {
            let msg = e.message
            if (msg.includes('(auth/invalid-email)')) msg = "Invalid email address";
            if (msg.includes('(auth/email-already-in-use)')) msg = "Email already in use";
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