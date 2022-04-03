import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useCallback} from 'react';
import { useSelector, connect } from 'react-redux';
import { getHoldings, getCoinMarket } from '../redux/marketActions';
import { useFocusEffect } from '@react-navigation/native';

import { SIZES, COLORS, FONTS, icons } from '../../constants';

const Home = ({ navigation, getHoldings, getCoinMarket, myHoldings, coins}) => {
    const { logged, user } = useSelector(state => state.useReducer);

    useEffect(() => {
        if(!logged) {
            navigation.navigate('Login');
        }
    }, []);

    useFocusEffect(useCallback(() => {
        getHoldings(holdings = user.holdings)
        getCoinMarket()
    }, []));

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Welcome, {user.userName} !</Text>
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
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#141414',
  },
  title: {
    height: 50,
    color: '#fff',
    fontSize: 30,
    marginTop: 50
  },
})