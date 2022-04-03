import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { FONTS, COLORS } from '../../constants';

const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {
    if(isTrade) {
        return <View style={{ alignItems: 'center', 
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.black }}>
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.white,
                    ...iconStyle
                    }}
            />
                    <Text style={{ color: COLORS.white }}>
                    Trade
                    </Text>
                </View>
    } else {
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
        <Text style={{ color: focused ? COLORS.white : COLORS.secondary, ...iconStyle }}>

        </Text>
        </Text>
    </View>
    }
}

export default TabIcon