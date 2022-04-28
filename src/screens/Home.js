import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import TopCryptoCurrency from '../components/TopCryptoCurrency';

import { COLORS } from '../../constants';

/**
 * Home / Coin list page
 * @typedef PropType
 * @property {Object} navigation navigation object to change pages
 */
const Home = ({ navigation }) => {
    const { user } = useSelector(state => state.useReducer);
    const [ coins, setCoins ] = useState([]);

    useEffect(() => {
      if(user) {
        getCoinMarket();
      }
    }, []);
  
    const getCoinMarket = () => {
      const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${user.currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=7d`;
      return axios({
          url: apiUrl,
          method: 'GET',
          header: {
              Accept: 'application/json'
          }
      }).then((res) => {
          if(res.status == 200) {
            setCoins(res.data);
          } 
      }).catch((err) => console.log(err));
  };

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
    !user ? <Text>Loading...</Text> : 
    <View style={styles.body}>
      <TopCryptoCurrency coins={coins} userCurrency={user.currency} seeCryptoDetails={seeCryptoDetails}/>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLORS.black,
  }
})