import { StyleSheet, View, Text } from 'react-native';
import { useCallback } from 'react';
import { useSelector, connect } from 'react-redux';
import { getCoinMarket } from '../redux/marketActions';
import { useFocusEffect } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import { COLORS } from '../../constants';
import TopCryptoCurrency from '../components/TopCryptoCurrency';

const Home = ({ navigation, getCoinMarket, coins}) => {
    const { user } = useSelector(state => state.useReducer);

    useFocusEffect(useCallback(() => {
        getCoinMarket();
    }, []));

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