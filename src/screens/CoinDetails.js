import { StyleSheet, Text, View, ScrollView, 
  ActivityIndicator, Image, Dimensions, TouchableOpacity } from 'react-native';
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import HeaderBar from '../components/HeaderBar';
import TextButton from '../components/TextButton';
const numbro = require("numbro");

import { SIZES, COLORS, FONTS } from '../../constants';
const WIDTH = Dimensions.get('window').width;

/**
 * Coin details page
 * @typedef PropType
 * @property {Object} route route params of the current page
 */
const CoinDetails = ({ route }) => {
    const [coinDetails, setCoinDetails] = useState([]);
    const [coinPrices, setCoinPrices] = useState([]);
    const [timeframe, setTimeframe] = useState(86400);
    const [chartLoading, setChartLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(true);
    const [coinInPortfolio, setCoinInPortfolio] = useState(null);
    const { user } = useSelector(state => state.useReducer);

    const dispatch = useDispatch();

    const modifyHoldings = (bool) => {
      const coinId = route.params.coin.id;
      const userHoldings = [...user.holdings];
      if(bool === true) {
        setCoinInPortfolio(true);
        return dispatch(setUser({...user, holdings: [...userHoldings, {id: coinId}]}));
      } else {
        let holdingIndex;
        userHoldings.map((holding, index) => {
          if(holding.id.toLowerCase() === coinId.toLowerCase()) {
            holdingIndex = index;
          }
        });
        userHoldings.splice(holdingIndex, 1);
        setCoinInPortfolio(false);
        return dispatch(setUser({...user, holdings: userHoldings}));
      }
    };

    useEffect(() => {
        getPriceInfo();
        setDetailsLoading(true);
        isInPortfolio();
      axios.get(`https://api.coingecko.com/api/v3/coins/${route.params.coin.id}?developer_data=false`)
      .then((response) => {
        setCoinDetails(response.data);
        setDetailsLoading(false);
      })
      .catch((error) => console.log(error));
    }, []);

    const getPriceInfo = () => {
        setChartLoading(true);
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
          setChartLoading(false);
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
      user.holdings.map(item => {
        if(route.params.coin.id === item.id) {
          setCoinInPortfolio(true);
        }
      })
    }

    const priceChangePercentPeriod = () => {
      if(timeframe === 3600) {
        return coinDetails?.market_data?.price_change_percentage_1h_in_currency[user.currency]
      }
      if(timeframe === 86400) {
        return coinDetails?.market_data?.price_change_percentage_24h_in_currency[user.currency]
      }
      if(timeframe === 604800) {
        return coinDetails?.market_data?.price_change_percentage_7d_in_currency[user.currency]
      }
      if(timeframe === 2629743) {
        return coinDetails?.market_data?.price_change_percentage_30d_in_currency[user.currency]
      }
      if(timeframe === 31556926) {
        return coinDetails?.market_data?.price_change_percentage_1y_in_currency[user.currency]
      }
      
    }

  return (
    <View style={styles.body}>
      <HeaderBar title={
      <>
        <View style={styles.headerContainer}>
          <View style={styles.headerTitle}>
              {detailsLoading ? <></> : <Image
              source={{uri: coinDetails?.image?.small}}
              resizeMode='contain'
              style={{
                  width: 25,
                  height: 25,
                  paddingHorizontal: 20
                  }}
              /> }<Text style={styles.text}>{route.params.coin.name} </Text>
          </View>
          <TouchableOpacity style={styles.starStyles}>
              {coinInPortfolio ? 
              <FontAwesome onPress={() => modifyHoldings(false)} name="star" size={24} color="white"/> :
              <AntDesign onPress={() => modifyHoldings(true)} name="staro" size={24} color="white"/>}
          </TouchableOpacity>
        </View>
      </>
      } /> 
      {topButtons()}
      {chart()}
      {
        detailsLoading ? <></> : 
        <View style={styles.descriptionContainer}>
          <ScrollView contentContainerStyle={{ flexGrow: 1}}>
              <Text style={styles.details}>Market Cap Rank: {coinDetails.market_cap_rank}</Text>
              <Text style={styles.details}>Market Cap: {numbro(coinDetails?.market_data?.market_cap[user.currency]).format({thousandSeparated: true})} {user.currency.toUpperCase()}</Text>
              <Text style={styles.details}>Current Price: {numbro(coinDetails?.market_data?.current_price[user.currency]).format({thousandSeparated: true})} {user.currency.toUpperCase()}</Text>
              <Text style={styles.details}>Price Change Percent: {priceChangePercentPeriod()} %</Text>
          </ScrollView>
        </View>
      }
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
      headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: WIDTH
      },
      headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        color: COLORS.white,
        ...FONTS.largeTitle
      },
      details: {
        color: COLORS.white,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding / 2
      },
      starStyles: {
        width: 44, 
        marginHorizontal: SIZES.padding, 
        paddingVertical: SIZES.padding / 2, 
        justifyContent: 'center', 
        alignItems: 'center'
      }
})