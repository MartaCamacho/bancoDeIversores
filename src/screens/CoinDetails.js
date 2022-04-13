import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from 'react';
import HeaderBar from '../components/HeaderBar';
import axios from 'axios';
import { SIZES, COLORS, FONTS } from '../../constants';
import TextButton from '../components/TextButton';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const CoinDetails = ({ route }) => {
    const [coinDetails, setCoinDetails] = useState([]);
    const [coinPrices, setCoinPrices] = useState([]);
    const [timeframe, setTimeframe] = useState(86400);


    useEffect(() => {
        getPriceInfo();

      axios.get(`https://api.coingecko.com/api/v3/coins/${route.params.coin.id}?developer_data=false`)
      .then((response) => {
        setCoinDetails(response.data);
      })
      .catch((error) => console.log(error));

    }, []);

    const getPriceInfo = () => {
        const now = Math.round((new Date()).getTime() / 1000);
        axios.get(`https://api.coingecko.com/api/v3/coins/${route.params.coin.id}/market_chart/range?vs_currency=${route.params.coin.currency}&from=${now - timeframe}&to=${now}`)
        .then((response) => {
            const transformPrices = () => {
              const data = response.data ? response.data.prices.map((item) => {
                  return item[1];
              }) : [];
              return data;
            };
          setCoinPrices(transformPrices());
        })
        .catch((error) => console.log(error));
    }

    const updateChartData = (unix) => {
        setTimeframe(unix);
        getPriceInfo();
    }

    const topButtons = () => {
        return (
            <View style={styles.buttonsContainer}>
                <TextButton 
                label="1H"
                onPress={() => updateChartData(3600)}
                active={timeframe === 3600}
                />
                <TextButton 
                label="1D"
                onPress={() => updateChartData(86400)}
                active={timeframe === 86400}
                />
                <TextButton 
                label="1W"
                onPress={() => updateChartData(604800)}
                active={timeframe === 604800}
                />
                <TextButton 
                label="1M"
                onPress={() => updateChartData(2629743)}
                active={timeframe === 2629743}
                />
                <TextButton 
                label="1Y"
                onPress={() => updateChartData(31556926)}
                active={timeframe === 31556926}
                />
            </View>
        )
    };

    const chart = () => {
        return (
            coinPrices.length > 0 && <View style={styles.chartContainer}>
            <LineChart
                withDots={false}
                withInnerLines={false}
                withVerticalLines={false}
                withOuterLines={false}
                data={{
                    datasets: [{ 
                        data: coinPrices,
                        color: () => COLORS.white, 
                        }]
                }}
                width={420}
                height={220}
                chartConfig={{ 
                    color: () => COLORS.lightGray3,
                    fillShadowGradientFrom: 'transparent',
                    fillShadowGradientTo: 'transparent'
                        }}
                bezier
                style={{paddingRight: 0}}
            />
            </View>
        )
    }
    
  return (
    <View style={styles.body}>
      <HeaderBar title={route.params.coin.name} />
      {topButtons()}
      {chart()}
      <View>
          <Text style={styles.description}>{coinDetails?.description?.en}</Text>
      </View>
    </View>
  )
}

export default CoinDetails

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingBottom: 100
      },
      buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius
      },
      description: {
          color: COLORS.white,
          paddingHorizontal: SIZES.padding,
          textAlign: 'justify'
      },
      chartContainer: {
        color: COLORS.white,
        marginTop: SIZES.radius,

      }
})