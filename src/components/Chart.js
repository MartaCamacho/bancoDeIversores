import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import {
    ChartDot,
    ChartPath,
    ChartPathProvider,
    ChartXLabel,
    ChartYLabel,
    monotoneCubicInterpolation
} from '@rainbow-me/animated-charts';
import moment from 'moment';

import { SIZES, COLORS, FONTS } from '../../constants';

export const Chart = ({ containerStyle, chartPrices}) => {

    const startUnixTimestamp = moment().subtract(7, 'day').unix();
    const date = chartPrices ? chartPrices?.map((item, index) => {
        return {
            x: startUnixTimestamp + (index + 1) * 3600,
            y: item
        }
    }) : [];

    const points = monotoneCubicInterpolation({data, range: 40})
    return (
        <View style={{...containerStyle}}>
          {data.lenth > 0 &&
          <ChartPathProvider
              height={150}
              width={SIZES.width}
              stroke={COLORS.lightGreen}
              strokeWidth={2}
          />
          }
        </View>
      )
}

const styles = StyleSheet.create({})