import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useCallback, useState} from 'react';
import { useSelector, connect } from 'react-redux';
import { getHoldings, getCoinMarket } from '../redux/marketActions';
import { useFocusEffect } from '@react-navigation/native';

import { SIZES, COLORS, FONTS, icons } from '../../constants';
import { BalanceInfo, Chart } from '../components';
import TopCryptoCurrency from '../components/TopCryptoCurrency';

const Home = ({ navigation, getHoldings, getCoinMarket, coins}) => {
    const { logged, user } = useSelector(state => state.useReducer);
    const { myHoldings } = useSelector(state => state.marketReducer);
    const [selectedCoin, setSelectedCoin] = useState(null);

    useEffect(() => {
        /* if(!logged) {
            navigation.navigate('Login');
        } */
    }, []);

    useFocusEffect(useCallback(() => {
        getHoldings(holdings = user.holdings);
        getCoinMarket();
    }, []));

    const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);

    const valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0);
    const percChange = valueChange / (totalWallet - valueChange) * 100;

    const renderWalletInfoSection = () => {
      return <View>
                  <View style={styles.walletContainer}>
                    <BalanceInfo
                      title='Your Wallet'
                      displayAmount={totalWallet}
                      changePct={percChange}
                      containerStyle={{
                        marginTop: 50
                      }}
                    />
                  </View>
                    <Chart 
                      containerStyle={{marginTop: SIZES.padding * 2}}
                      chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d?.price : 
                      coins[0]?.sparkline_in_7d?.price}
                    />
                    <TopCryptoCurrency coins={coins} setSelectedCoin={setSelectedCoin} />
              </View>
      
    }

  return (
    <View style={styles.body}>
    {renderWalletInfoSection()}
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
  },
  walletContainer: {
    paddingHorizontal: SIZES.padding,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: COLORS.gray
  }
})