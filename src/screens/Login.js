import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import ButtonComponent from '../components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setLogged } from '../redux/actions';

const Login = ({ navigation }) => {
  const { logged } = useSelector(state => state.useReducer);
  const [ email, setEmail ] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if(logged) {
      navigation.navigate('Home');
    }
  }, []);
  
  const handleLogin = async () => {
      dispatch(setLogged(true));
    /* if(email.length == 0) {
      Alert.alert('Incorrect email', 'Please, introduce an email');
    } else {
      try {
        await AsyncStorage.setItem('UserEmail', email);
        dispatch(setLogged(true));
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    } */
  };

  return (
    <View style={styles.body}>
      <Image
      style={styles.logo}
      source={require('../../assets/logo.png')}
      />
      <Text style={styles.text}>
        Login
      </Text>
      <TextInput 
        style={styles.input}
        onChangeText={(value) => dispatch(setEmail(value))}
        value={email}
        placeholder='Enter your email'
      />
      <Text style={{color: 'blue'}}
        onPress={() => navigation.navigate('Signup')}>
        If you do not have an account, signup
      </Text>
      <ButtonComponent 
        title='Login'
        color='#B0191E'
        onPressFunction={handleLogin}
      />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#000000',
      color: '#fff'
    },
    text: {
      height: 50,
      color: '#fff',
      fontSize: 30
    },
    logo: {
      width: 186,
      height: 112,
      margin: 20
    },
    input: {
      width: 300,
      height: 50,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      fontSize: 20,
      marginTop: 130,
      marginBottom: 10
    }
})