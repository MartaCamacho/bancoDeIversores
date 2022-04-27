import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { getCoinMarket } from '../redux/marketActions';
import { CommonActions } from '@react-navigation/native';

import { COLORS } from '../../constants';
import TopCryptoCurrency from '../components/TopCryptoCurrency';

const Home = ({ navigation}) => {
    const { user } = useSelector(state => state.useReducer);
    const [ coins, setCoins ] = useState([]);

    useEffect(() => {
      getCoinMarket();
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

function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCoinMarket: (currency, coinList, orderBy, sparkLine, priceChangePerc, perPage, page) => {
      return dispatch(getCoinMarket( currency, coinList, orderBy, sparkLine, priceChangePerc, perPage, page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLORS.black,
  }
})