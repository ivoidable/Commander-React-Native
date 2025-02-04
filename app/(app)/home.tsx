import { View, Text, Button, ActivityIndicator } from 'react-native'
import { useAuth } from '@/context/authContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ChatList from '@/components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '@/firebaseConfig';

export default function Home() {
  const {logout, user} = useAuth();
  const [users, setUsers] = useState([1]);
  useEffect(() => {
    if(user?.uid) getUsers();
  }, []);
  const getUsers = async () => {
    // Fetch users from firebase firestore
    const q = query(usersRef, where('userId', '!=', user?.uid));
    const querySnapshot = await getDocs(q);
    let users: any[] | ((prevState: number[]) => number[]) = [];
    querySnapshot.forEach((doc) => {
      users.push({...doc.data()});
    });
    setUsers(users);
  }
  const handleLogout = async () => {
    await logout();
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='light' />
      {
        (users.length>0)? (
        <ChatList users={users} currentUser={user} />
        ): (
          <View className="flex-1 items-center" style={{top: hp(30)}}>
            <ActivityIndicator size={'large'} />
          </View>
        )
      }
    </View>
  )
}