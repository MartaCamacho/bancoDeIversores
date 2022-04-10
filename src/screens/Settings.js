import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogged, setUser } from '../redux/actions';

import HeaderBar from '../components/HeaderBar';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import { Header } from '@react-navigation/stack';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const { logged, user } = useSelector(state => state.useReducer);

  const logOut = () => {
    dispatch(setLogged(false));
    dispatch(setUser(''));
    navigation.navigate('Login');
  };

  const SectionTitle = ({ title }) => {
    return (
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>
          {title}
        </Text>
      </View>
    )
  }

  const Setting = () => {
    return (
      <View></View>
    )
  }

  return (
    <View style={styles.body}>
      {/* <Text style={styles.title}>
        Settings
      </Text>
      <Text 
      style={styles.item}
      onPress={() => logOut()}
      >
        Log out
      </Text> */}

      <View style={styles.profileContainer}>
        <HeaderBar title="Settings" />
        <ScrollView>
          <View style={styles.emailContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.email}>
                {user.email}
              </Text>
            </View>
          </View>
          <SectionTitle title="APP" />
          <Setting 
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log('pressed')}
          />
        </ScrollView>
      </View>
      
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: COLORS.black,
    },
    profileContainer: {
      paddingHorizontal: SIZES.padding,
      backgroundColor: COLORS.black
    },
    emailContainer: {
      flexDirection: 'row',
      marginTop: SIZES.radius
    },
    email: {
      color: COLORS.white,
      ...FONTS.h3
    },
    sectionTitle: {marginTop: SIZES.padding},
    sectionTitleText: {
      color: COLORS.lightGray3,
      ...FONTS.h4
    }
})