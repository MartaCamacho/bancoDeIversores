import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Image, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogged, setUser } from '../redux/actions';

import HeaderBar from '../components/HeaderBar';
import { SIZES, COLORS, FONTS, icons } from '../../constants';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const { logged, user } = useSelector(state => state.useReducer);

  const logOut = () => {
    dispatch(setLogged(false));
    dispatch(setUser(undefined));
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

  const Setting = ({ title, value, onPress, arrow}) => {
    return <TouchableOpacity style={styles.settingIntemContainer} onPress={onPress}>
              <Text style={styles.settingItemLeftText}>{title}</Text>
              <View style={styles.settingItemRightText}>
                <Text style={styles.settingItemRightGray}>
                  {value}
                </Text>
                {arrow && <Image
                source={icons.rightArrow}
                style={styles.settingItemRightArrow} />}
              </View>
            </TouchableOpacity> 
  }

  return (
    <View style={styles.body}>
      <HeaderBar title="Settings" />
      <View style={styles.profileContainer}>
        <ScrollView>
          <SectionTitle title="ACCOUNT" />
          <Setting 
            title="Name"
            value={user.userName}
            arrow={true}
            onPress={() => console.log('pressed')}
          />
          <Setting 
            title="Email"
            value={user.email}
            arrow={true}
            onPress={() => console.log('pressed')}
          />
          <Setting 
            title="Currency"
            value={user.currency.toUpperCase()}
            arrow={true}
            onPress={() => console.log('pressed')}
          />

          <SectionTitle title="SECURITY" />
          <Setting 
            title="Password"
            value=""
            arrow={true}
            onPress={() => console.log('pressed')}
          />
          <Setting 
            title="Log out"
            value=""
            arrow={false}
            onPress={() => logOut()}
          />
        </ScrollView>
        {/* <Modal
        
        >

        </Modal> */}
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
    email: {
      color: COLORS.white,
      ...FONTS.h3
    },
    sectionTitle: {marginTop: SIZES.padding},
    sectionTitleText: {
      color: COLORS.lightGray3,
      ...FONTS.h4
    },
    settingIntemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50
    },
    settingItemLeftText: {
      flex: 1,
      color: COLORS.white,
      ...FONTS.h3
    },
    settingItemRightText: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    settingItemRightGray: {
      marginRight: SIZES.radius,
      color: COLORS.lightGray3,
      ...FONTS.h3
    },
    settingItemRightArrow: {
      height: 15,
      width: 15,
      tintColor: COLORS.white
    }
})