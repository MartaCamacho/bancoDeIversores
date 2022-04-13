import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import {useState, useEffect} from 'react';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import { LineChart } from 'react-native-chart-kit';
import HeaderBar from './HeaderBar';
import TextButton from './TextButton';
import axios from 'axios';

const TopCryptoCurrency = ({ coins, userCurrency, seeCryptoDetails }) => {
  const [coinList, setCoinList] = useState(coins);
  const [currencySymbol, setCurrencySymbol] = useState(userCurrency === 'eur' ? '€' : '$');
  const [currentFilter, setCurrentFilter] = useState('current_price');
  const [loading, setLoading] = useState(true);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    orderList();
  }, [])
  
  const orderBy = (item) => {
    setIsSorted(!isSorted);
    const positive = isSorted ? 1 : -1;
    const negative = isSorted ? -1 : 1;
    coinList.sort(function(a, b){
      if(a[item] < b[item]) { return negative; }
      if(a[item] > b[item]) { return positive; }
      return 0;
    });
  };
  
  const orderList = (currency, order, page) => {
    const perPage = 25;
    let currencyUrl
    if(currencySymbol === '€' && !currency) {
      currencyUrl = 'eur';
    }
    setLoading(true);
    const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency || currencyUrl || 'usd'}&order=${order || 'market_cap_desc'}&per_page=${perPage}&page=${page || 1}&sparkline=true`;
    axios
      .get(baseUrl)
      .then((res) => {
        setCoinList(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error, 'Axios GET request failed');
        setLoading(false);
      });
  }

  const selectedFilter = (filter) => {
    orderList( null, filter, null );
    return setCurrentFilter(filter);
  };

  const renderFilterButtons = () => {
    return ( 
    <View>
      <Text style={styles.filtersTitle}>
        Sort by:
      </Text>
      <View style={styles.buttonsContainer}>
          <TextButton 
          label="Name"
          onPress={() => [setCurrentFilter('id'), orderBy('id')]}
          active={currentFilter === 'id'}
          />
          <TextButton 
          label="Price"
          onPress={() => selectedFilter('current_price')}
          active={currentFilter === 'current_price'}
          />
          <TextButton 
          label="Market cap"
          onPress={() => selectedFilter('market_cap_asc')}
          active={currentFilter === 'market_cap_asc'}
          />
          <TextButton 
          label="Volume"
          onPress={() => selectedFilter('total_volume')}
          active={currentFilter === 'total_volume'}
          />
      </View>
    </View>
    )
  }

  const tableHeader = () => {
    return (
      <View style={styles.tableListHeaderContainer}>
          <Text style={{
              flex: 1, 
              color: COLORS.lightGray3
              }}>
          Asset
          </Text>
          <Text style={{
              flex: 1, 
              color: COLORS.lightGray3,
              textAlign: 'center' 
              }}>
          Price
          </Text>
          <Text style={{
              flex: 1, 
              color: COLORS.lightGray3,
              textAlign: 'right' 
              }}>
          Filter
          </Text>
      </View>
    )
  }

  return (<>
              <HeaderBar title="Top Crypto"/>
              {renderFilterButtons()}
                {loading ? 
                <View style={styles.spinnerContainer}>
                  <ActivityIndicator size="large" color={COLORS.white}/> 
                </View>
                : 
                <>
                {tableHeader()}
                <FlatList
                      data={coinList}
                      keyExtractor={item => item.id}
                      contentContainerStyle={{
                        marginTop: 5,
                        paddingHorizontal: SIZES.padding
                      }}
                      renderItem={({item}) => {

                        let priceColor = item.price_change_percentage_24h == 0 ? COLORS.lightGray3 :
                        item.price_change_percentage_24h > 0 ? COLORS.lightGreen : COLORS.red;

                        return (
                          <TouchableOpacity style={styles.coinListContainer}
                          onPress={() => seeCryptoDetails(item.name, item.symbol, item.id)}
                          >
                          <View style={{ flex: 1, flexDirection: 'row', width: '33%' }}>
                            <View style={{ width: 25 }}>
                              <Image 
                              source={{uri: item.image}}
                              style={{ width: 20, height: 20 }}
                              />
                            </View>
                            <View style={{ flex: 1}}>
                              <Text style={{
                                color: COLORS.white, 
                                ...FONTS.h3
                              }}>
                                {item.name}
                              </Text>
                            </View>
                          </View>
                            
                          <View style={styles.coinChartContainer}>
                            <LineChart
                                withVerticalLabels={false}
                                withHorizontalLabels={false}
                                withDots={false}
                                withInnerLines={false}
                                withVerticalLines={false}
                                withOuterLines={false}
                                data={{
                                    datasets: [{ data: item.sparkline_in_7d.price }]
                                }}
                                width={80}
                                height={50}
                                chartConfig={{ 
                                    color: () => priceColor,
                                    fillShadowGradientFrom: 'transparent',
                                    fillShadowGradientTo: 'transparent'
                                      }}
                                bezier
                                style={{paddingRight: 0}}
                            />
                          </View>
                          
                          <View style={{ width: '33%' }}>
                            <Text style={{ 
                              textAlign: 'right',
                              color: COLORS.white,
                              ...FONTS.h4 }}>
                              {currencySymbol} {currentFilter === 'current_price' ? 
                              item.current_price : currentFilter === 'market_cap_desc' 
                              || currentFilter === 'market_cap_desc' ? 
                              item.market_cap : currentFilter === 'total_volume' ? 
                              item.total_volume : item.current_price }
                            </Text>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-end'
                            }}
                            >
                              {
                                currentFilter === 'current_price' && item.price_change_percentage_24h != 0 && <Image 
                                source={icons.upArrow}
                                style={{
                                  height: 10,
                                  width: 10,
                                  tintColor: priceColor,
                                  transform: item.price_change_percentage_24h > 0 ? 
                                  [{rotate: '45deg'}] : [{rotate: '125deg'}]
                                }}
                              />
                              }
                              {currentFilter === 'current_price' && <Text style={{
                                marginLeft: 5,
                                color: priceColor,
                                ...FONTS.body5,
                                lineHeight: 15
                              }}>
                                {item?.price_change_percentage_24h?.toFixed(2)}%
                              </Text>}
                            </View>
                          </View>
                          </TouchableOpacity>
                        )
                      }}
                      ListFooterComponent={
                        <View style={{ marginBottom: 50 }}></View>
                      }
                    />
                    </>
                    }
              </>
  )
}

export default TopCryptoCurrency

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  filtersTitle: {
    color: COLORS.white,
    marginLeft: 15,
    ...FONTS.h3,
    marginTop: 15
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SIZES.radius,
    marginHorizontal: SIZES.radius
  },
  coinChartContainer: {
    flex: 1,
    alignItems: 'center'
  },
  coinListContainer: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableListHeaderContainer: {
    flexDirection: 'row', 
    marginTop: 30,
    paddingHorizontal: SIZES.padding
  }
})