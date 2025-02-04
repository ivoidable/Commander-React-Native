import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { blurhash, formatDate, getRoomId } from '@/utils/common'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

export default function ChatItem({index, item, noBorder, router, currentUser}) {
  const [lastMessage, setLastMessage] = useState(undefined);
  const [myCommands, setMyCommands] = useState(undefined);
  const [otherCommands, setOtherCommands] = useState(undefined);

  const setNewCommandScore = async (roomId, userId) => {
    const docRef = doc(db, "rooms", roomId);
    // const data = (await getDoc(docRef)).data();
    setDoc(docRef, { [userId]: 0 }, { merge: true });
    return 0;
  }

  const shite = async () => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
          onSnapshot(docRef, (doc) => {
            setMyCommands(doc.get(`${currentUser.userId}`));
            setOtherCommands(doc.get(`${item.userId}`));
          })
      }

      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef, orderBy('createdAt', 'desc'));

      onSnapshot(q, (snapshot) => {
          let allMessages = snapshot.docs.map(doc=>{
              return doc.data();
          });
          setLastMessage(allMessages[0]? allMessages[0] : null);
      })
  }

  useEffect(() => {
      shite()
  }, [])

  // const renderLastMessage = () => {
  //   if (typeof lastMessage == 'undefined') return 'Loading...';
  //   if (lastMessage) {
  //     if (currentUser?.userId==lastMessage?.userId) return "You: " + lastMessage?.text;
  //     else return lastMessage?.text;
  //   } else {
  //     return "Say Hi 👋";
  //   }
  // }

  const renderTime = () => {
    if(lastMessage) {
        let date = lastMessage?.createdAt;
        return formatDate(new Date(date?.seconds * 1000))
    }
  }
  
  const openChatRoom = () => {
    router.navigate({
      pathname: '/commandCenter',
      params: item,
    });
  }
  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 p-4 border border-neutral-200 rounded-2xl`}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#d3d3d3",
        margin:hp(0.5),
      }}
    >
        <Image 
          source={{ uri: item?.profileUrl }}
          style={{ height: hp(6), width: hp(6), borderRadius: 100 }} 
          transition={300}
          placeholder={blurhash}
        />

        {/* name and last message */}
        <View className='flex-1 gap-1'>
            <View className='flex-row justify-between'>
                <Text style={{fontSize: hp(3)}} className='font-bold text-neutral-800'>{item?.username}</Text>
                <Text style={{fontSize: hp(2.75)}} className='font-bold text-neutral-500'>{myCommands + " - " + otherCommands}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}