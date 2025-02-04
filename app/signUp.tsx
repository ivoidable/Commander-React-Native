import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Entypo from '@expo/vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import ImagePickerSpace from '@/components/ImagePicker';
import CustomKeyboardView from '@/components/CustomKeyboardView';
import { useAuth } from '@/context/authContext';

export default function signUp() {

  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const {register} = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleRegister = async () => {
    if (!usernameRef.current || !emailRef.current || !passwordRef.current || !confirmPasswordRef.current) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (passwordRef.current !== confirmPasswordRef.current) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, null);
    setLoading(false);
    if (!response.success) {
      Alert.alert('Error', response.msg);
    }
  }
  
  return (
    <CustomKeyboardView>
      <StatusBar style='light' />
      <View style={{paddingTop: hp(10), paddingHorizontal: wp(5)}} className='flex-1 justify-center'>


        <View className="gap-10" >
          <Text style={{fontSize: hp(6)}} className="font-black tracking-wider text-center text-neutral-800">Sign up</Text>
          {/* inputs */}
          <View className='gap-4'>
            <View style={{height: hp(7)}} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <Entypo name="user" size={hp(2)} color="gray" />
              <TextInput
              onChangeText={value => usernameRef.current = value}
              style={{fontSize: hp(2)}}
              className='flex-1 font-semibold text-neutral-600' 
              placeholder='Username'
              placeholderTextColor={'gray'}
              />
            </View>
            <View style={{height: hp(7)}} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <Entypo name="email" size={hp(2)} color="gray" />
              <TextInput
              onChangeText={value => emailRef.current = value}
              style={{fontSize: hp(2)}}
              keyboardType='email-address'
              className='flex-1 font-semibold text-neutral-600' 
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
                className='flex-1 font-semibold text-neutral-600' 
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor={'gray'}
                />
              </View>
            </View>

            <View className='gap-3'>
              <View style={{height: hp(7)}} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
                <Entypo name="lock" size={hp(2)} color="gray" />
                <TextInput
                onChangeText={value => confirmPasswordRef.current = value}
                style={{fontSize: hp(2)}}
                className='flex-1 font-semibold text-neutral-600' 
                placeholder='Confirm Password'
                secureTextEntry={true}
                placeholderTextColor={'gray'}
                />
              </View>
            </View>

            <View>
              <ImagePickerSpace />
            </View>

            <View>
              {
                loading ? (
                  <View className='flex-row justify-center items-center'>
                    <ActivityIndicator style={{ height: hp(6.5), aspectRatio: 1}} />
                  </View>

                ) : (
                  <TouchableOpacity onPress={handleRegister} style={{height: hp(6.5)}} className='bg-indigo-500 rounded-xl justify-center'>
                    <Text style={{fontSize: hp(2.5)}} className='font-black tracking-wider text-center text-white'>Sign up</Text>
                  </TouchableOpacity>
                )
              }
            </View>

            {/* buttons */}
            


            {/* Sign up text */}
            <View className='flex-row items-center justify-center gap-2'>
              <Text style={{fontSize: hp(2)}} className='font-semibold text-neutral-500'>Already Have an account?</Text>
              <Pressable onPress={() => router.replace('/signIn')}>
                <Text style={{fontSize: hp(2)}} className='font-semibold text-indigo-500'>Sign in</Text>
              </Pressable>
            </View>
        </View>
      </View>
    </View>
  </CustomKeyboardView>
  )
}