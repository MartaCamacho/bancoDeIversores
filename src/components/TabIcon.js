import { Text, View, Image } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';

/**
 * Bottom tab icon component
 * @typedef PropType
 * @property {Boolean} focused button is selected or not
 * @property {Object} icon image to show inside the button
 * @property {Object} iconStyle specific styles to apply to the icon
 */

const TabIcon = ({ focused, icon, iconStyle }) => {
    return <View>
                <Text style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={icon}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? COLORS.white : COLORS.secondary,
                            ...iconStyle
                        }}
                    />
                </Text>
            </View>
}

export default TabIcon