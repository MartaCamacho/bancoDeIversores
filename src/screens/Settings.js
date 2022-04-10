import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogged, setUser } from '../redux/actions';

import HeaderBar from '../components/HeaderBar';
import { SIZES, COLORS, FONTS, icons } from '../../constants';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const { logged, user } = useSelector(state => state.useReducer);
  const [switchItem, setSwitchItem] = useState(false);

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

  const Setting = ({ title, value, type, onPress}) => {
    return type === 'button' ? 
    <TouchableOpacity style={styles.settingIntemContainer} onPress={onPress}>
      <Text style={styles.settingItemLeftText}>{title}</Text>
      <View style={styles.settingItemRightText}>
        <Text style={styles.settingItemRightGray}>
          {value}
        </Text>
        <Image
        source={icons.rightArrow}
        style={styles.settingItemRightArrow} />
      </View>
    </TouchableOpacity> 
    : 
    <View style={styles.switch}>
      <Text style={styles.settingItemLeftText}>{title}</Text>
      <Switch
        value={value}
        onValueChange={(value) => onPress(value)}
      />
    </View>
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
          <Setting 
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log('pressed')}
          />

          <SectionTitle title="ACCOUNT" />
          <Setting 
            title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log('pressed')}
          />
          <Setting 
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log('pressed')}
          />

          <SectionTitle title="SECURITY" />
          <Setting 
            title="dummy text"
            value={switchItem}
            type="switch"
            onPress={(value) => setSwitchItem(value)}
          />
          <Setting 
            title="Password Settings"
            value=""
            type="button"
            onPress={() => console.log('pressed')}
          />
          <Setting 
            title="Change Password"
            value=""
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
    },
    switch: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center'
    }
})