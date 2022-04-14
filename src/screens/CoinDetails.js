import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import HeaderBar from '../components/HeaderBar';
import TextButton from '../components/TextButton';
import moment from 'moment';

import { SIZES, COLORS, FONTS } from '../../constants';

const CoinDetails = ({ route }) => {
    const [coinDetails, setCoinDetails] = useState([]);
    const [coinPrices, setCoinPrices] = useState([]);
    const [timeframe, setTimeframe] = useState(86400);
    const [chartLoading, setChartLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(true);
    const { user } = useSelector(state => state.useReducer);

    const dispatch = useDispatch();
    /* dispatch(setUser(user)); */

    useEffect(() => {
        getPriceInfo();
        setDetailsLoading(true);
      axios.get(`https://api.coingecko.com/api/v3/coins/${route.params.coin.id}?developer_data=false`)
      .then((response) => {
        setCoinDetails(response.data);
        setDetailsLoading(false)
      })
      .catch((error) => console.log(error));

    }, []);

    const getPriceInfo = () => {
        setChartLoading(true)
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
          setChartLoading(false)
        })
        .catch((error) => console.log(error));
    };

    const updateChartData = (unix) => {
        setTimeframe(unix);
        getPriceInfo();
    };

    const topButtons = () => {
        return (
            <View style={styles.buttonsContainer}>
                <TextButton 
                label="1H"
                onPress={() => updateChartData(3600)}
                active={timeframe === 3600}
                containerStyle={{marginTop: 5}}
                />
                <TextButton 
                label="1D"
                onPress={() => updateChartData(86400)}
                active={timeframe === 86400}
                containerStyle={{marginTop: 5}}
                />
                <TextButton 
                label="1W"
                onPress={() => updateChartData(604800)}
                active={timeframe === 604800}
                containerStyle={{marginTop: 5}}
                />
                <TextButton 
                label="1M"
                onPress={() => updateChartData(2629743)}
                active={timeframe === 2629743}
                containerStyle={{marginTop: 5}}
                />
                <TextButton 
                label="1Y"
                onPress={() => updateChartData(31556926)}
                active={timeframe === 31556926}
                containerStyle={{marginTop: 5}}
                />
            </View>
        )
    };

    const chart = () => {
        return (
            chartLoading ? 
            <View style={styles.spinnerContainer}>
                <ActivityIndicator size="large" color={COLORS.white}/> 
            </View> 
          :  coinPrices.length > 0 && <View style={styles.chartContainer}>
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

    const isInPortfolio = () => {
      let starFilled = false;
      user.holdings.map(item => {
        if(route.params.coin.id === item.id) {
          starFilled = true;
        }
      })
      return starFilled ? 
      <FontAwesome name="star" size={24} color="white" /> :
      <AntDesign name="staro" size={24} color="white" />
    }


  return (
    <View style={styles.body}>
      <HeaderBar title={
      <>
        <Text style={styles.text}>
        {detailsLoading ? <></> : <Image
        source={{uri: coinDetails?.image?.small}}
        resizeMode='contain'
        style={{
            width: 25,
            height: 25,
            paddingHorizontal: 20
            }}
        /> } {route.params.coin.name} {isInPortfolio()}
        </Text>
      </>
      } /> 
      {topButtons()}
      {chart()}
      <View style={styles.descriptionContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
            <Text style={styles.description}>
            {coinDetails?.description?.en}
            </Text>
        </ScrollView>
      </View>
    </View>
  )
}

export default CoinDetails

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: COLORS.black
      },
      buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius
      },
      descriptionContainer: {
        height: 800,
        flex: 1,
      },
      description: {
        height: 800,
        color: COLORS.white,
        paddingHorizontal: SIZES.padding,
        textAlign: 'justify',
        flex: 1
      },
      chartContainer: {
        color: COLORS.white,
        marginTop: SIZES.radius,
        backgroundColor: 'red'
      },
      spinnerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 220
      },
      text: {
          color: COLORS.white
      }
})