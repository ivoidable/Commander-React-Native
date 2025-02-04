import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { blurhash } from '../utils/common'

export default function MessageItem({message, currentUser}) {
  if (currentUser?.userId==message?.userId) {
    return (
        <View className='flex-row justify-end mb-3 mr-3'>
            <View style={{ width: wp(80) }} className='flex'>
                <View className='flex-row self-end p-3 justify-center items-center rounded-2xl bg-white border border-neutral-200'>
                    <Text style={{fontSize: hp(2.5)}}>
                        {message?.text}
                    </Text>
                    <View className='ml-3 h-10 w-10 overflow-hidden rounded-full border border-neutral-400'>
                        <Image 
                            source={{ uri: message?.profileUrl }}
                            contentFit='cover'
                            style={{ borderRadius: 100, height: hp(5), width: hp(5) }} 
                            transition={300}
                            placeholder={blurhash}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
  } else {
    return (
        <View style={{width: wp(80),}} className='ml-3 mb-3'>
            <View className='flex-row self-start justify-center items-center p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200'>
                <View className='mr-3 h-10 w-10 overflow-hidden rounded-full border border-neutral-400'>
                    <Image 
                        source={{ uri: message?.profileUrl }}
                        contentFit='cover'
                        style={{ borderRadius: 100, height: hp(5), width: hp(5) }} 
                        transition={300}
                        placeholder={blurhash}
                    />
                </View>
                <Text style={{
                    fontSize: hp(2.5),
                }}>{message?.text}</Text>
            </View>
        </View>
    )
  }
}