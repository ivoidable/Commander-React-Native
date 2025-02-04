import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { MenuOption } from "react-native-popup-menu"
import { Text, View } from 'react-native'

export const MenuItem = ({
    text, action, value, icon
})=> {
    return (
        <MenuOption onSelect={() => action(value)}>
            <View className="px-4 py-1 flex-row justify-between items-center">
                <Text className="text-neutral-800 font-semibold" style={{fontSize: hp(2)}} >{text}</Text>
                {icon}
            </View>
        </MenuOption>
    )
}