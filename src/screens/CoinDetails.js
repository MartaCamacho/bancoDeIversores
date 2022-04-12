import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from 'react';
import HeaderBar from '../components/HeaderBar';
import axios from 'axios';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import TextButton from '../components/TextButton';

const CoinDetails = ({ route }) => {
    const [coinDetails, setCoinDetails] = useState([]);
    const [coinPrices, setCoinPrices] = useState([]);
    const [timeframe, setTimeframe] = useState(7);


    useEffect(() => {
       axios.get(`https://api.coingecko.com/api/v3/coins/${route.params.coin.id}/ohlc?vs_currency=usd&days=${timeframe}`)
      .then((response) => {
        setCoinPrices(response.data);
      })
      .catch((error) => console.log(error));

      axios.get(`https://api.coingecko.com/api/v3/coins/${route.params.coin.id}?developer_data=false`)
      .then((response) => {
        setCoinDetails(response.data);
      })
      .catch((error) => console.log(error));

    }, []);
    
  
  return (
    <View style={styles.body}>
      <HeaderBar title={route.params.coin.name} />
      <View style={styles.buttonsContainer}>
          <TextButton 
          label="1H"
          onPress={() => setTimeframe()}
          active={timeframe === '1H'}
          />
          <TextButton 
          label="1D"
          onPress={() => setTimeframe('1D')}
          active={timeframe === '1D'}
          />
          <TextButton 
          label="1W"
          onPress={() => setTimeframe(7)}
          active={timeframe === 7}
          />
          <TextButton 
          label="1M"
          onPress={() => setTimeframe(30)}
          active={timeframe === 30}
          />
          <TextButton 
          label="1Y"
          onPress={() => setTimeframe(365)}
          active={timeframe === 365}
          />
          
      </View>
    </View>
  )
}

export default CoinDetails

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: COLORS.black,
      },
      buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius
      }
})