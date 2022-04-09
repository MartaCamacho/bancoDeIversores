import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SIZES, COLORS, FONTS, icons } from '../../constants';

const TopCryptoCurrency = ({coins, setSelectedCoin}) => {
  return (
                <FlatList
                      data={coins}
                      keyExtractor={item => item.id}
                      contentContainerStyle={{
                        marginTop: 30,
                        paddingHorizontal: SIZES.padding
                      }}
                      ListHeaderComponent={
                        <View style={{ marginBottom: SIZES.radius }}>
                          <Text style={{
                            color: COLORS.white, 
                            ...FONTS.h3, 
                            fontSize: 18
                          }}>
                            Top CryptoCurrency
                          </Text>
                        </View>
                      }
                      renderItem={({item}) => {

                        let priceColor = item.price_change_percentage_7d_in_currency == 0 ? COLORS.lightGray3 :
                        item.price_change_percentage_7d_in_currency > 0 ? COLORS.lightGreen : COLORS.red;

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
                                $ {item.current_price}
                              </Text>
                              <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                              }}
                              >
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
                          </TouchableOpacity>
                        )
                      }}
                      ListFooterComponent={
                        <View style={{ marginBottom: 50 }}></View>
                      }
                    />
  )
}

export default TopCryptoCurrency