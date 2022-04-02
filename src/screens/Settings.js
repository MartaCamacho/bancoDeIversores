import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogged, setUser } from '../redux/actions';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const { logged, user } = useSelector(state => state.useReducer);
  console.warn(logged, user, 'eyy')

  const logOut = () => {
    dispatch(setLogged(false));
    dispatch(setUser(''));
    navigation.navigate('Login');
  };

  const editUser = () => {
    console.warn('edit')
  }

  return (
    <View style={styles.body}>
      <StatusBar backgroundColor="#141414" />
      <Text style={styles.title}>
        Settings
      </Text>
      <Text 
      style={styles.item}
      onPress={() => logOut()}
      >
        Log out
      </Text>
      <Text 
      style={styles.item}
      onPress={() => editUser()}
      >
        Edit user
      </Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#141414',
    },
    title: {
      marginTop: 20,
      height: 50,
      color: '#fff',
      fontSize: 30
    },
    item: {
      color: '#fff',

    }
})