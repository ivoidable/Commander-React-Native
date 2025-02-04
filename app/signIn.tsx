import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Entypo from '@expo/vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { useAuth } from '@/context/authContext';
import CustomKeyboardView from '@/components/CustomKeyboardView';

export default function signIn() {

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const {login} =  useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);

    if (!response.success) {
      Alert.alert('Error', response.msg);
    }
  }

  const router = useRouter()
  return (
    <CustomKeyboardView>
      <StatusBar style='light' />
      <View style={{paddingTop: hp(10), paddingHorizontal: wp(5)}} className='flex-1'>
      <View className='items-center'>
      </View>
        <View className="gap-10 flex-1 justify-center" >
          <Text style={{fontSize: hp(5)}} className="font-black tracking-wider text-center text-neutral-800">Sign in</Text>
          {/* inputs */}
          <View className='gap-4'>
            <View style={{height: hp(7)}} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <Entypo name="email" size={hp(2)} color="gray" />
              <TextInput
              onChangeText={value => emailRef.current = value}
              keyboardType='email-address'
              style={{fontSize: hp(2)}}
              className='flex-1 font-semibold text-neutral-700' 
              placeholder='Email address'
              placeholderTextColor={'gray'}
              />
            </View>
            <View className='gap-3'>
              <View style={{height: hp(7)}} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
                <Entypo name="lock" size={hp(2)} color="gray" />
                <TextInput
                onChangeText={value => passwordRef.current = value}
                style={{fontSize: hp(2)}}
                className='flex-1 font-semibold text-neutral-700' 
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor={'gray'}
                />
              </View>
              <Text style={{fontSize: hp(1.5)}} className='font-semibold text-right text-neutral-500'>Forgot Password?</Text>
            </View>

            <View>
              {
                loading ? (
                  <View className='flex-row justify-center items-center'>
                    <ActivityIndicator style={{ height: hp(6.5), aspectRatio: 1}} />
                  </View>

                ) : (
                  <TouchableOpacity onPress={handleLogin} style={{height: hp(6.5)}} className='bg-indigo-500 rounded-xl justify-center'>
                    <Text style={{fontSize: hp(2.5)}} className='font-black tracking-wider text-center text-white'>Sign in</Text>
                  </TouchableOpacity>
                )
              }
            </View>

            {/* buttons */}
            


            {/* Sign up text */}
            <View className='flex-row items-center justify-center gap-2'>
              <Text style={{fontSize: hp(2)}} className='font-semibold text-neutral-500'>Don't have an account?</Text>
              <Pressable onPress={() => router.replace('/signUp')}>
                <Text style={{fontSize: hp(2)}} className='font-semibold text-indigo-500'>Sign up</Text>
              </Pressable>
            </View>
        </View>
      </View>
    </View>
  </CustomKeyboardView>
  )
}