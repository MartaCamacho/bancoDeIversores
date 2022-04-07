import { Text, StyleSheet, View, Animated } from 'react-native';
import React from 'react';
import moment from 'moment';

import { SIZES, COLORS, FONTS } from '../../constants';

const Chart = ({ containerStyle, chartPrices}) => {

    const startUnixTimestamp = moment().subtract(7, 'day').unix();
    const data = chartPrices ? chartPrices?.map((item, index) => {
        return {
            x: startUnixTimestamp + (index + 1) * 3600,
            y: item
        }
    }) : [];

    return (
        <Animated.View style={{...containerStyle}}>
          
        </Animated.View>
      )
}

export default Chart;