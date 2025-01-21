import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Entypo from '@expo/vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';

export default function signIn() {

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
  }

  const router = useRouter()
  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='light' />
      <View style={{paddingTop: hp(5), paddingHorizontal: wp(5)}} className='flex-1 gap-12'>
        <View className='items-center'>
          <Image style={{height: hp(25), width: wp(25)}} resizeMode='contain' source={require('../assets/images/icon.png')} />
        </View>

        <View className="gap-10" >
          <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-500">Sign in</Text>
          {/* inputs */}
          <View className='gap-4'>
            <View style={{height: hp(9)}} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <Entypo name="email" size={hp(2.7)} color="gray" />
              <TextInput
              onChangeText={value => emailRef.current = value}
              style={{fontSize: hp(2.5)}}
              className='flex-1 font-semibold text-neutral-300' 
              placeholder='Email address'
              placeholderTextColor={'gray'}
              />
            </View>
            <View className='gap-3'>
              <View style={{height: hp(9)}} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
                <Entypo name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                onChangeText={value => passwordRef.current = value}
                style={{fontSize: hp(2.5)}}
                className='flex-1 font-semibold text-neutral-300' 
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor={'gray'}
                />
              </View>
              <Text style={{fontSize: hp(1.8)}} className='font-semibold text-right text-neutral-500'>Forgot Password?</Text>
            </View>

            <View>
              {
                loading ? (
                  <View className='flex-row justify-center items-center'>
                    <ActivityIndicator style={{ height: hp(8), aspectRatio: 1}} />
                  </View>

                ) : (
                  <TouchableOpacity onPress={handleLogin} style={{height: hp(8)}} className='bg-indigo-500 rounded-xl justify-center'>
                    <Text style={{fontSize: hp(2.5)}} className='font-black tracking-wider text-center text-white'>Sign in</Text>
                  </TouchableOpacity>
                )
              }
            </View>

            {/* buttons */}
            


            {/* Sign up text */}
            <View className='flex-row items-center justify-center gap-2'>
              <Text style={{fontSize: hp(2.5)}} className='font-semibold text-neutral-500'>Don't have an account?</Text>
              <Pressable onPress={() => router.navigate('/signUp')}>
                <Text style={{fontSize: hp(2.5)}} className='font-semibold text-indigo-500'>Sign up</Text>
              </Pressable>
            </View>
        </View>
      </View>
    </View>
  </View>
  )
}