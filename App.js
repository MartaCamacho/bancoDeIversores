import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Crypto from './src/screens/Crypto';
import CryptoList from './src/screens/CryptoList';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import Settings from './src/screens/Settings';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName='CryptoList'
        screenOptions={{
            headerShown: false,
          activeTintColor: '#e91e63',
          inactiveTintColor: '#000',
          showLabel: true,
          showIcon: true 
          }}
        >
          <Tab.Screen
          name="Login"
          component={Login}
            />
          <Tab.Screen
          name="Signup"
          component={Signup}
            />
          <Tab.Screen
          name="Home"
          component={Home}
            />
          <Tab.Screen
          name="Crypto"
          component={Crypto}
            />
          <Tab.Screen
          name="CryptoList"
          component={CryptoList}
            />
          <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
          tabBarIcon: () => (<Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} name="holi" style={{width: 50, height: 50}} />)
          }}
            />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20
  }
});
