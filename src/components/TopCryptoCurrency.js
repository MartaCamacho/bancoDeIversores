import { View, Text, FlatList, TouchableOpacity, TextInput,
  Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import {useState, useEffect, useRef} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import { LineChart } from 'react-native-chart-kit';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import HeaderBar from './HeaderBar';
const numbro = require("numbro");

const WIDTH = Dimensions.get('window').width;

const TopCryptoCurrency = ({ coins, userCurrency, seeCryptoDetails }) => {
  const [coinList, setCoinList] = useState(coins);
  const [currencySymbol, setCurrencySymbol] = useState(userCurrency.toUpperCase());
  const [currentFilter, setCurrentFilter] = useState('current_price');
  const [loading, setLoading] = useState(true);
  const [isSorted, setIsSorted] = useState(false);
  const [search, setSearch] = useState("");
  const pickerRef = useRef(null);

  useEffect(() => {
    orderList();
  }, []);
  
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
  
  const orderList = (order, page) => {
    const perPage = 50;
    setLoading(true);
    const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencySymbol}&order=${order || 'market_cap_desc'}&per_page=${perPage}&page=${page || 1}&sparkline=true`;
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
  };

  const renderFilterButtons = () => {
    return ( 
      <View style={styles.filtersTitle}>
        <Text style={styles.filtersTitleText}>Sort by:</Text>
        <View style={styles.pickerContainer}>
          <Picker 
          selectedValue={currentFilter} 
          ref={pickerRef}
          onValueChange={(itemValue, itemIndex) => itemValue === 'id' || itemValue === 'idReverse' ? [setCurrentFilter(itemValue), orderBy('id')] : setCurrentFilter(itemValue)}
          style={styles.dropdown}
          dropdownIconColor={COLORS.white}
          >
            <Picker.Item label='Market cap' value='market_cap_desc' />
            <Picker.Item label='Price' value='current_price' />
            <Picker.Item label='Name Z-A' value='id'/>
            <Picker.Item label='Name A-Z' value='idReverse'/>
            <Picker.Item label='Volume' value='total_volume' />
          </Picker>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#858585"
          onChangeText={(text) => text && setSearch(text)}
          />
          <MaterialCommunityIcons name="magnify" size={20} color="#858585" style={styles.magnifyingGlass}/>
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
              {currentFilter === 'current_price' ? 'Price' : 
              currentFilter === 'total_volume' ? 'Volume' :
              currentFilter === 'market_cap_desc' ? 'Market Cap' 
              : 'Filter'}
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
                      data={coinList.filter(
                        (coin) =>
                          coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                          coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                      )}
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
                              numbro(item.current_price).format({thousandSeparated: true}) : currentFilter === 'market_cap_desc' 
                              || currentFilter === 'market_cap_desc' ? 
                              numbro(item.market_cap).format({thousandSeparated: true}) : currentFilter === 'total_volume' ? 
                              numbro(item.total_volume).format({thousandSeparated: true}) : numbro(item.current_price).format({thousandSeparated: true}) }
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
                                {numbro(item?.price_change_percentage_24h?.toFixed(2)).format({thousandSeparated: true})}%
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
  pickerContainer: {
    borderRadius: 10,
    width: WIDTH / 2, 
    color: COLORS.white,
    borderColor: "#666",
  },
  dropdown: {
    backgroundColor: COLORS.gray, 
    width: WIDTH / 2.5, 
    borderWidth: 1,
    color: COLORS.white,
},
  filtersTitle: {
    color: COLORS.white,
    ...FONTS.h3,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filtersTitleText: {
    color: COLORS.white,
    marginHorizontal: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  searchContainer: {
    position: 'relative',
    width: "25%",
  },
  magnifyingGlass: {
    position: 'absolute',
    right: 2,
    bottom: 5,
  }
})