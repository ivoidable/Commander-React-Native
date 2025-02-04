import { View, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Image} from 'expo-image';
import {blurhash} from '@/utils/common';
import { useAuth } from '@/context/authContext';
import { MenuItem } from '@/components/CustomMenuItems';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Entypo from '@expo/vector-icons/Entypo';

export default function HomeHeader() {
    const {user, logout} = useAuth();
    const handleProfile = () => {

    }
    const handleLogout = async () => {
      await logout();
    }
    const {top} = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top+10}} className='flex-row justify-between px-5 bg-indigo-400 pb-4 rounded-b-3xl shadow'>
      <View>
        <Text style={{fontSize: hp(5)}} className='font-black text-white'>
            Players
        </Text>
      </View>

      <View>
        <Menu>
            <MenuTrigger >
                <Image
                    style={{height: hp(4.3), aspectRatio: 1, borderRadius: 100}}
                    source={user?.profileUrl}
                    placeholder={require('../assets/images/profile-user.png')}
                    transition={500}
                />
            </MenuTrigger>
            <MenuOptions customStyles={{
              optionsContainer: {
                borderRadius: 12,
                borderCurve: "continuous",
                marginTop: 30,
                marginLeft: -20,
                backgroundColor: "white",
                shadowOpacity: 0.2,
                shadowOffset: {width: 0, height: 6},
                width: 150,
              }
            }}>
                <MenuItem
                action={handleProfile}
                icon={<Entypo name="user" size={hp(2.5)} color="#737373" />}
                text={"Profile"}
                value={null}
                />
                <Divider />
                <MenuItem
                action={handleLogout}
                icon={<Entypo name="log-out" size={hp(2.5)} color="#737373" />}
                text={"Logout"}
                value={null}
                />
            </MenuOptions>
        </Menu>
      </View>
    </View>
  )
}

const Divider = () => {
  return (
    <View className='p-[1px] w-full bg-neutral-200' />
  )
}