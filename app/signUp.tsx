import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Entypo from '@expo/vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import ImagePickerExample from '@/components/imagePicker';
import ImagePickerSpace from '@/components/imagePicker';
import CustomKeyboardView from '@/components/customKeyboardView';
import { useAuth } from '@/context/authContext';

export default function signUp() {

  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const {register} = useAuth();
  const [loading, setLoading] = useState(false);

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

    console.log(response)
    if (!response.success) {
      Alert.alert('Error', response.msg);
    }
  }

  const router = useRouter()
  return (
    <CustomKeyboardView>
      <StatusBar style='light' />
      <View style={{paddingTop: hp(20), paddingHorizontal: wp(5)}} className='flex-1 gap-12 bg-white'>
        <View className='items-center'>
        </View>

        <View className="gap-10" >
          <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-500">Sign up</Text>
          {/* inputs */}
          <View className='gap-4'>
            <View style={{height: hp(9)}} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <Entypo name="user" size={hp(2.7)} color="gray" />
              <TextInput
              onChangeText={value => usernameRef.current = value}
              style={{fontSize: hp(2.5)}}
              className='flex-1 font-semibold text-neutral-300' 
              placeholder='Username'
              placeholderTextColor={'gray'}
              />
            </View>
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
            </View>

            <View className='gap-3'>
              <View style={{height: hp(9)}} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
                <Entypo name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                onChangeText={value => confirmPasswordRef.current = value}
                style={{fontSize: hp(2.5)}}
                className='flex-1 font-semibold text-neutral-300' 
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
                    <ActivityIndicator style={{ height: hp(8), aspectRatio: 1}} />
                  </View>

                ) : (
                  <TouchableOpacity onPress={handleRegister} style={{height: hp(8)}} className='bg-indigo-500 rounded-xl justify-center'>
                    <Text style={{fontSize: hp(2.5)}} className='font-black tracking-wider text-center text-white'>Sign up</Text>
                  </TouchableOpacity>
                )
              }
            </View>

            {/* buttons */}
            


            {/* Sign up text */}
            <View className='flex-row items-center justify-center gap-2'>
              <Text style={{fontSize: hp(2.5)}} className='font-semibold text-neutral-500'>Already Have an account?</Text>
              <Pressable onPress={() => router.navigate('/signIn')}>
                <Text style={{fontSize: hp(2.5)}} className='font-semibold text-indigo-500'>Sign in</Text>
              </Pressable>
            </View>
        </View>
      </View>
    </View>
  </CustomKeyboardView>
  )
}