import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import HeaderBar from '../components/HeaderBar';
const numbro = require("numbro");

import { SIZES, COLORS, FONTS, icons } from '../../constants';

/**
 * Portfolio page
 * @typedef PropType
 * @property {Object} navigation navigation object to change pages
 */
const Portfolio = ({navigation}) => {
    const { user } = useSelector(state => state.useReducer);
    const [ myHoldings, setMyHoldings ] = useState([]);

    useEffect(() => {
      const ids = user.holdings.map((item) => { return item.id }).join(',');
        const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${user.currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d&ids=${ids}`;
        return axios({
            url: apiUrl,
            method: 'GET',
            header: {
                Accept: 'application/json'
            }
        }).then((res) => {
            if(res.status == 200) {
                const myHoldings = res.data.map((item) => {
                    return {
                        id: item.id,
                        symbol: item.symbol,
                        name: item.name,
                        image: item.image,
                        current_price: item.current_price,
                        price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency
                    };
                });

                setMyHoldings(myHoldings);
            }
        }).catch((err) => console.log(err));
    }, [user]);

    const seeCryptoDetails = (name, symbol, id) => {
        navigation.dispatch(
          CommonActions.navigate({
            name: 'CryptoDetails',
            params: {
              coin: {name: name, symbol: symbol, id: id, currency: user.currency},
            },
          })
        );
      };

    return (
        <View style={styles.body}> 
            <View style={{ flex: 1, backgroundColor: COLORS.black}}>
                <HeaderBar title="Portfolio"/>
                {user.holdings.length > 0 ? <FlatList
                    data={myHoldings}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    ListHeaderComponent={
                        <View>
                          <Text style={styles.header}>
                          Your Assets
                          </Text>
                          <Text style={styles.tableHeaderItem}>
                              Asset
                              </Text>
                              <Text style={[styles.tableHeaderItem, { textAlign: 'right' }]}>
                              Price
                              </Text>
                          </View>
                    }
                    renderItem={({item}) => {
                        let priceColor = item.price_change_percentage_7d_in_currency == 0 ? COLORS.lightGray3 :
                        item.price_change_percentage_7d_in_currency > 0 ? COLORS.lightGreen : COLORS.red;
                        return <TouchableOpacity
                        style={styles.tableContentItem}
                        onPress={() => seeCryptoDetails(item.name, item.symbol, item.id)}>
                        <View style={styles.tableContentItemAlignment}>
                            <Image 
                                source={{ uri: item.image}}
                                style={{width: 20, height: 20}}
                            />
                            <Text style={styles.coinName}>
                            {item.name}
                            </Text>
                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <Text
                                style={styles.currency}>
                                {user.currency.toUpperCase()} {numbro(item?.current_price.toLocaleString()).format({thousandSeparated: true})}
                                </Text>
                                <View
                                style={styles.changeContainer}>
                                {
                                  item.price_change_percentage_7d_in_currency != 0 && <Image 
                                  source={icons.upArrow}
                                  style={[styles.changePercentIcon, {
                                    tintColor: priceColor,
                                    transform: item.price_change_percentage_7d_in_currency > 0 ? 
                                    [{rotate: '45deg'}] : [{rotate: '125deg'}]
                                  }]}
                                />
                                }
                                <Text style={[styles.changePercent, {color: priceColor}]}>
                                  {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                                </Text>
                                </View>
                            </View>
                        </View>

                        </TouchableOpacity>
                    }}
                    /> : <View>
                      <Text style={styles.noHoldingsMessage}>
                      You have no holdings yet, check out the <Text style={styles.noHoldingsLink} onPress={() => navigation.navigate('Home')}>Top Crypto</Text> and save your favourites to see them here
                      </Text>
                    </View>}
            </View>
        </View>
    )
}
  
  export default Portfolio

  const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: COLORS.black,
    },
    header: {
      ...FONTS.h2, 
      color: COLORS.white
    },
    noHoldingsMessage: {
      color: COLORS.white,
      ...FONTS.h3,
      marginTop: 20,
      paddingHorizontal: SIZES.padding / 2
    },
    noHoldingsLink: {
      color: 'blue'
    },
    listContainer: {
      marginTop: SIZES.padding,
      paddingHorizontal: SIZES.padding
    },
    tableHeaderItem: {
      flex: 1, 
      color: COLORS.lightGray3
    },
    tableContentItem: {
      flexDirection: 'row', 
      height: 55
    },
    tableContentItemAlignment: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    coinName: {
      marginLeft: SIZES.radius,
      color: COLORS.white,
      ...FONTS.h4
    },
    currency: {
      textAlign: 'right',
      color: COLORS.white,
      ...FONTS.h4,
      lineHeight: 15
    },
    changeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    changePercentIcon: {
      height: 10,
      width: 10,
    },
    changePercent: {
      marginLeft: 5,
      ...FONTS.body5,
      lineHeight: 15
    }
  })