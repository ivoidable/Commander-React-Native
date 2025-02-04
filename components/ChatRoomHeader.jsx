import { View, Text, TouchableOpacity, Alert, Touchable, Pressable } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { blurhash } from '@/utils/common'

export default function ChatRoomHeader({user, router}) {
  return (
    <Stack.Screen
        options={{
            title: '',
            headerShadowVisible: false,
            headerLeft: () => 
                (<View className='flex-row items-center gap-4 ml-4'>
                    <TouchableOpacity onPress={() => {
                        router.back()
                    }}>
                        <Entypo name="chevron-left" size={hp(5)} color="#737373" />
                    </TouchableOpacity>
                    <View className='flex-row items-center gap-3'>
                        <Image 
                            source={{uri: user?.profileUrl}} 
                            style={{height: hp(5), width: hp(5), borderRadius: 100}} 
                            transition={300}
                            placeholder={blurhash}
                        />
                        <Text style={{fontSize: hp(3)}} className='font-bold text-neutral-800'>{user?.username}</Text>
                    </View>
                </View>),
            headerRight: () => (
                <View className='flex-row items-center'>
                <View className='flex-row items-center gap-4 mr-4'>
                    <Pressable onPress={() => {
                        Alert.alert("خخخخخخخخخخ","do you know how much calls hosting cost??")    
                    }}>
                        <Ionicons name="call" size={hp(3.5)} color="#737373" />
                    </Pressable>
                    <Pressable onPress={() => {
                        Alert.alert("خخخخخخخخخخ","do you know how much calls hosting cost??")    
                    }}>
                        <Ionicons name="videocam" size={hp(3.5)} color="#737373" />
                    </Pressable>
                </View>
                </View>
            )
        }} 
    />
  )
}