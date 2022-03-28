import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName='Login'
        screenOptions={({route}) => ({
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              if(route.name === 'Settings') {
                iconName = ''
              }

            }
        })}
        >
          <Tab.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
            />
          <Tab.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
            />
          <Tab.Screen
          name="Home"
          component={Home}
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
});
