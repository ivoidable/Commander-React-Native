import { View, Text, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import CustomKeyboardView from '@/components/CustomKeyboardView';
import {useAuth} from '@/context/authContext';
import { addDoc, collection, doc, getDoc, limit, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { Feather, Ionicons } from '@expo/vector-icons';
import { getRoomId } from '../../utils/common';
import {db} from '@/firebaseConfig';

export default function Chatroom() {
    const item = useLocalSearchParams(); // second user
    const {user} = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const textRef = useRef("");
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    const fetchMessages = async (loadMore = false) => {
        createRoomIfNotExists();
        setTimeout(() => {
            setLoading(false);
        }, 3000);
        if (loading || (loadMore && !hasMore)) return;
        
        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(15));
        
        if (loadMore && lastDoc) {
            q = query(messagesRef, orderBy('createdAt', 'desc'), limit(15), startAfter(lastDoc));
        }
        
        try {
            setLoading(true);
            let unsub = onSnapshot(q, (snapshot) => {
                if (!snapshot.empty) {
                    const newMessages = snapshot.docs.map((doc) => doc.data());
                    if (loadMore) {
                        setMessages([...newMessages]);
                    } else {
                        setMessages(newMessages.reverse());
                    }
                    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
                } else {
                    setHasMore(false); // No more messages to fetch
                }
            });
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }


        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            updateScrollView();
        });

        return () => {
            unsub();
            keyboardDidShowListener.remove();
        };
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    const createRoomIfNotExists = async () => {
        // Room Id
        let roomId = getRoomId(user?.userId, item?.userId);
        if ((await getDoc(doc(db, "rooms", roomId))).exists()) return;
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    };

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({animated: true});
        },100)
    }

    const handleSendMessage = async (isCommand) => {
        let message = textRef.current.trim();
        if(!message) {
            return;
        }
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, "rooms", roomId);
            const messagesRef = collection(docRef, "messages");
            if(inputRef) inputRef?.current?.clear();
            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                isCommand: isCommand !== null ? false : true,
                createdAt: Timestamp.fromDate(new Date()),
                senderName: user?.username,
                profileUrl: user?.profileUrl,
            })
            textRef.current = ""
            setLastDoc(newDoc);
            updateScrollView();
        } catch (err) {
            Alert.alert('Error', err.message)
        }
    }

    const handleSendMessageFromKeyboard = async (e) => {
        handleSendMessage(false);
    }

  return (
    <CustomKeyboardView inChat={true}>
    <View className='flex-1 bg-white'>
        <StatusBar style='dark' />
        <ChatRoomHeader user={item} router={router} />
        <View className='h-3' style={{
            borderBottomWidth: 1, borderColor: "#d3d3d3"
        }}/>
        <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
            <View className='flex-1'>
                <MessageList messages={messages} currentUser={user} scrollViewRef={scrollViewRef} onScroll={fetchMessages} loading={loading}/>
            </View>
            <View style={{
                marginBottom: hp(2)
            }} className='pt-2'>
                <View className='flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5'>
                    <TextInput
                        returnKeyType='send'
                        onSubmitEditing={(e) => handleSendMessageFromKeyboard(e)}
                        onChangeText={(text) => textRef.current = text}
                        ref={inputRef}
                        selectTextOnFocus={false}
                        focusable={true}
                        autoFocus={true}
                        blurOnSubmit={false}
                        clearTextOnFocus={false}
                        placeholder={'Type message...'}
                        placeholderTextColor={'#737373'}
                        style={{
                            fontSize: hp(2),
                            color: '#000'
                        }}
                        className='flex-1 mr-2 ml-2'
                    />
                    <TouchableOpacity onPress={() => handleSendMessage(true)} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                        <Feather name='command' size={hp(3.5)} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    </CustomKeyboardView>
  )
}