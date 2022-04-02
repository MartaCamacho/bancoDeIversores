import { StyleSheet, Text, View } from 'react-native';
import {useEffect} from 'react';
import { useSelector } from 'react-redux';

const Home = ({ navigation, route}) => {
    const { logged, user } = useSelector(state => state.useReducer);

    useEffect(() => {
        if(!logged) {
            navigation.navigate('Login');
        }
    }, []);

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Welcome, {user.userName} !</Text>
    </View>
  )
}

export default Home

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