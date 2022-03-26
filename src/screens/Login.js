import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <View style={styles.body}>
      <Text>Login</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => { navigation.navigate('Signup') }}
        >
        <Text>go to signup</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 200,
        backgroundColor: '#0080ff',
        color: '#fff',
        borderRadius: 8,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
      flex: 3,
      alignItems: 'center',
      backgroundColor: '#000000',
      color: '#fff'
    }
})