import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {useState} from 'react';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import HeaderBar from './HeaderBar';
import TextButton from './TextButton';
import axios from 'axios';

const TopCryptoCurrency = ({ coins, setSelectedCoin }) => {
  const [coinList, setCoinList] = useState(coins);
  const [currency, setCurrency] = useState('$');
  const [currentFilter, setCurrentFilter] = useState('market_cap_desc');

  const orderList = (currency, order, page) => {
    const perPage = 25;
    const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency || 'usd'}&order=${order || 'market_cap_desc'}&per_page=${perPage}&page=${page || 1}&sparkline=false`;
    axios
      .get(baseUrl)
      .then((res) => {
        if (page > 1) {
          setCoinList([...coinList, ...res.data]);
        } else {
          setCoinList(res.data);
        }
      })
      .catch((error) => {
        console.error(error, 'Axios GET request failed');
      });
  }

  const selectedFilter = (filter) => {
    orderList( null, filter, null );
    return setCurrentFilter(filter);
  };

  const renderFilterButtons = () => {
    return(
      <View style={styles.buttonsContainer}>
          <TextButton label="EUR" onPress={() => [orderList('eur'), setCurrency('€')]} />
          <TextButton 
          label="Price"
          onPress={() => selectedFilter('current_price')}
          containerStyle={{marginLeft: SIZES.base}} 
          />
          <TextButton 
          label="Market cap"
          onPress={() => selectedFilter('market_cap_asc')}
          containerStyle={{marginLeft: SIZES.base}} 
          />
          <TextButton 
          label="Volume"
          onPress={() => selectedFilter('total_volume')}
          containerStyle={{marginLeft: SIZES.base}} 
          />
      </View>
    )
  }

  return (<>
              <HeaderBar title="Top Crypto"/>
              {renderFilterButtons()}
                <FlatList
                      data={coinList}
                      keyExtractor={item => item.id}
                      contentContainerStyle={{
                        marginTop: 30,
                        paddingHorizontal: SIZES.padding
                      }}
                      renderItem={({item}) => {

                        let priceColor = item.price_change_percentage_24h == 0 ? COLORS.lightGray3 :
                        item.price_change_percentage_24h > 0 ? COLORS.lightGreen : COLORS.red;

                        return (
                          <TouchableOpacity style={{
                            height: 55,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onPress={() => setSelectedCoin(item)}
                          >
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
                            <View>
                              <Text style={{ 
                                textAlign: 'right',
                                color: COLORS.white,
                                ...FONTS.h4 }}>
                                {currency} {item.current_price}
                              </Text>
                              <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                              }}
                              >
                                {
                                  item.price_change_percentage_24h != 0 && <Image 
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
                                <Text style={{
                                  marginLeft: 5,
                                  color: priceColor,
                                  ...FONTS.body5,
                                  lineHeight: 15
                                }}>
                                  {item?.price_change_percentage_24h?.toFixed(2)}%
                                </Text>
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
  )
}

export default TopCryptoCurrency

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    marginHorizontal: SIZES.radius
},
})