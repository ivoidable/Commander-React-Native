import CustomKeyboardView from '@/components/CustomKeyboardView'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, Button, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getRoomId } from '@/utils/common'
import { useAuth } from '@/context/authContext'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import DatePicker from 'react-native-date-picker';

export default function CommandCenter() {
  const otherUser = useLocalSearchParams();
  const {user} = useAuth();
  const [myCommands, setMyCommands] = useState<Number>(0);
  const [otherCommands, setOtherCommands] = useState<Number>(0);
  const router = useRouter();
  const [deadline, setDeadline] = useState(new Date(Date.now()))
  const commandRef = useRef("");
  const getCommands = async () => {
    try {
      // Get Room Id
      let roomId = getRoomId(user.userId, otherUser.userId);
  
      // Get Room Document
      const docRef = doc(db, "rooms", roomId);
  
      // Get Document Snapshot and Data
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Safely access user commands
        setMyCommands(data[user.userId] || 0); // Default to 0 if undefined
        setOtherCommands(data[otherUser.userId.toString()] || 0); // Default to 0 if undefined
      } else {
        console.log("No such document!");
        setDoc(docRef, { [user.userId]: 0, [otherUser.userId.toString()]: 0, roomId: roomId, createdAt: Timestamp.fromDate(new Date()) });
        setMyCommands(0);
        setOtherCommands(0);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      setMyCommands(0);
      setOtherCommands(0);
    }
  };

  useEffect(()=>{
    getCommands();
  }, []);

  return (
    <CustomKeyboardView>
      <View className='flex-1 items-center justify-center gap-4'>
        <View className='flex-row items-center gap-4'>
          <View className='rounded-xl border border-neutral-400 bg-green-200 p-2 flex-col justify-center items-center' style={{
            height: hp(15),
            width: hp(15)
          }}>
            <Text className='text-neutral-800 text-xl font-bold'>You:</Text>
            <Text className='text-neutral-800 text-3xl font-bold'>{myCommands.toString()}</Text>
          </View>
          <View className='rounded-xl border border-neutral-400 bg-red-200 p-2 flex-col justify-center items-center' style={{
            height: hp(15),
            width: hp(15)
          }}>
            <Text className='text-neutral-800 text-xl font-bold'>{otherUser.username}:</Text>
            <Text className='text-neutral-800 text-3xl font-bold'>{otherCommands.toString()}</Text>
          </View>
        </View>
        <TextInput 
          className='p-3 w-5/6 rounded-xl border border-neutral-400'
          style={{
            height: hp(15)
          }}
          placeholder='Command Description'
          placeholderTextColor={'#737373'}
          onChangeText={(text) => commandRef.current = text}
          multiline={true}
          numberOfLines={3}
          textAlignVertical='top'
          lineBreakStrategyIOS='standard'
        />
        {/* Date picker with the minimum date set to one hour from now */}
        <DatePicker 
          date={deadline} 
          mode="datetime"
          minimumDate={new Date(Date.now() + 60 * 60 * 1000)}
          maximumDate={new Date(Date.now() + 60 * 60 * 24 * 1000)}
          onDateChange={(date) => {
            setDeadline(date);
          }} 
          title={"Select Date"}
        />
        <TouchableOpacity onPress={() => {}} className='flex-row items-center border border-neutral-400 w-5/6 p-3 rounded-xl justify-center '>
          <Text className='text-neutral-800 text-2xl font-bold'>Send</Text>
        </TouchableOpacity>
      </View>
    </CustomKeyboardView>
  )
}