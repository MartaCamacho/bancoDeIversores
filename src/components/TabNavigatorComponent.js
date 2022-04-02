import { StyleSheet, Image, View } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

const TabNavigatorComponent = () => {
  return (
    <Tab.Navigator
        initialRouteName='Login'
        screenOptions={({route}) => ({
          tabBarActiveBackgroundColor: "#DDDDDD",
          tabBarInactiveBackgroundColor: "#FFFFFF",
          tabBarShowLabel: false,
          tabBarShowIcon: true
          })}
        >
          <Tab.Screen
          name="Home"
          component={Home}
            />
          <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
          tabBarIcon: () => {
            return (
              <Image
                tintColor="#000000"
                source={require("../../assets/settings.svg")}
                resizeMode="cover"
              />
            )
          }
          }}
            />
        </Tab.Navigator>
  )
}

export default TabNavigatorComponent

const styles = StyleSheet.create({})