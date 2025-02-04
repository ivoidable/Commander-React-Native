import { View, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CommandCenterHeader() {
    const {top} = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top+10}} className='flex-row justify-between px-5 bg-gray-400 pb-4 rounded-b-3xl shadow'>
        <Text style={{fontSize: hp(5)}} className='font-black text-white'>
            Command Center
        </Text>
    </View>
  )
}