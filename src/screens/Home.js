import { StyleSheet, Text, View } from 'react-native';
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation, route}) => {
    const { logged, user } = useSelector(state => state.useReducer);

    useEffect(() => {
        if(!logged) {
            navigation.navigate('Login');
        }
        //AsyncStorage.removeItem('userData');
    }, []);

  return (
    <View>
      <Text>Welcome, {user.userName} !</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})