import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useCallback} from 'react';
import { useSelector, connect } from 'react-redux';
import { getHoldings, getCoinMarket } from '../redux/marketActions';
import { useFocusEffect } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import { SIZES, COLORS, FONTS, icons } from '../../constants';
import TopCryptoCurrency from '../components/TopCryptoCurrency';

const Home = ({ navigation, getHoldings, getCoinMarket, coins}) => {
    const { logged, user } = useSelector(state => state.useReducer);

    useEffect(() => {
        /* if(!logged) {
            navigation.navigate('Login');
        } */
    }, []);

    useFocusEffect(useCallback(() => {
        getHoldings(holdings = user.holdings);
        getCoinMarket();
    }, []));

    const seeCryptoDetails = (name, symbol, id) => {
      navigation.dispatch(
        CommonActions.navigate({
          name: 'CryptoDetails',
          params: {
            coin: {name: name, symbol: symbol, id: id},
          },
        })
      );
    }

  return (
    <View style={styles.body}>
      <TopCryptoCurrency coins={coins} userCurrency={user.currency} seeCryptoDetails={seeCryptoDetails}/>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (holdings, currency, coinList, orderBy, sparkLine, priceChangePerc, perPage, page) => {
      return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkLine, priceChangePerc, perPage, page))
    },
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