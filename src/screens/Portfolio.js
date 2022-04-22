import {useCallback} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getHoldings } from '../redux/marketActions';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import HeaderBar from '../components/HeaderBar';

import { SIZES, COLORS, FONTS, icons } from '../../constants';

const Portfolio = ({navigation}) => {
    const { user } = useSelector(state => state.useReducer);
    const { myHoldings } = useSelector(state => state.marketReducer);
    const dispatch = useDispatch();

    useFocusEffect(useCallback(() => {
        dispatch(getHoldings(holdings = user.holdings));
    }, [user]));

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
                    <FlatList
                    data={myHoldings}
                    keyExtractor={item => item.id}
                      contentContainerStyle={{
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding
                      }}
                      ListHeaderComponent={
                          <View>
                            <Text style={{...FONTS.h2, color: COLORS.white}}>
                            Your Assets
                            </Text>
                            <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
                                <Text style={{
                                    flex: 1, 
                                    color: COLORS.lightGray3
                                    }}>
                                Asset
                                </Text>
                                <Text style={{
                                    flex: 1, 
                                    color: COLORS.lightGray3,
                                    textAlign: 'right' 
                                    }}>
                                Price
                                </Text>
                            </View>
                          </View>
                      }
                    renderItem={({item}) => {

                        let priceColor = item.price_change_percentage_7d_in_currency == 0 ? COLORS.lightGray3 :
                        item.price_change_percentage_7d_in_currency > 0 ? COLORS.lightGreen : COLORS.red;

                        return <TouchableOpacity
                        style={{flexDirection: 'row', height: 55}}
                        onPress={() => seeCryptoDetails(item.name, item.symbol, item.id)}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center'
                            }}>
                            <Image 
                                source={{ uri: item.image}}
                                style={{width: 20, height: 20}}
                            />
                            <Text
                            style={{ 
                                marginLeft: SIZES.radius,
                                color: COLORS.white,
                                ...FONTS.h4
                            }}
                            >
                            {item.name}
                            </Text>
                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <Text
                                style={{
                                    textAlign: 'right',
                                    color: COLORS.white,
                                    ...FONTS.h4,
                                    lineHeight: 15
                                }}>
                                {user.currency.toUpperCase()} {item.current_price.toLocaleString()}
                                </Text>
                                <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                }}>
                                {
                                  item.price_change_percentage_7d_in_currency != 0 && <Image 
                                  source={icons.upArrow}
                                  style={{
                                    height: 10,
                                    width: 10,
                                    tintColor: priceColor,
                                    transform: item.price_change_percentage_7d_in_currency > 0 ? 
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
                                  {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                                </Text>
                                </View>
                            </View>
                        </View>

                        </TouchableOpacity>
                    }}
                    />
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
  })