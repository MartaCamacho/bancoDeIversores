import { Text, StyleSheet, View, Animated, Dimensions, SafeAreaView  } from 'react-native';
import { useState, useEffect } from 'react';
import moment from 'moment';
//import { LineChart } from "react-native-chart-kit";
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { Circle } from 'react-native-svg';

import { SIZES, COLORS, FONTS } from '../../../constants';
import Tooltip from 'react-native-svg-charts/lib/module/chart-decorators/tooltip';

const Chart = ({ containerStyle, chartPrices}) => {
    
    const [tooltipX, setTooltipX] = useState(null);
    const [tooltipY, setTooltipY] = useState(null);
    const [tooltipIndex, setTooltipIndex] = useState(null);

    const screenWidth = Dimensions.get("window").width;

    const startUnixTimestamp = moment().subtract(7, 'day').unix();
    const data = chartPrices ? chartPrices?.map((item, index) => {
        return {
            x: startUnixTimestamp + (index + 1) * 3600,
            y: item
        }
    }) : [];

    /* const ChartPoints = ({ x, y, color }) =>
    chartPrices ? chartPrices.map((item, index) => {
        return <Circle
            key={index}
            cx={x(moment(item.x))}
            cy={y(item.y)}
            r={6}
            stroke={color}
            fill="white"
            onPress={() => [setTooltipX(moment(item.x)), setTooltipY(item.y), setTooltipIndex(index)]}
        />
    }
        ) : []; */
    const xAxisHeight = 30;
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 };

    return (
        chartPrices ? 
        <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
            {/* <YAxis
                data={data}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
            /> */}
            <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                    style={{ flex: 1, height: 200, backgroundColor: '#000' }}
                    data={data}
                    yAccessor={({ item }) => item.y}
                    xAccessor={({ item }) => item.x}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    numberOfTicks={10}
                    contentInset={verticalContentInset}
                    animate={true}
                    fill={'#000'}
                    fillOpacity={0}
                    strokeLinejoin={'round'}
                    ticks={10}
                >   
                    {/* {ChartPoints()} */}
                    {/* <Tooltip 
                    tooltipX={tooltipX}
                    tooltipY={tooltipY}
                    color="#003F5A"
                    index={tooltipIndex}
                    dataLength={chartPrices.length}
                    /> */}
                    {/* <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={data}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    /> */}
                </LineChart>
            </View>
        </View>
         : <></>
      )
}

export default Chart;