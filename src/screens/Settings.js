import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogged, setUser } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SIZES, COLORS, FONTS, icons } from '../../constants';
import HeaderBar from '../components/HeaderBar';
import ModalSettings from '../components/ModalSettings';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.useReducer);
  const [ newUserName, setNewUserName ] = useState(user.userName);
  const [ newPassword, setNewPassword ] = useState(user.password);
  const [ repeatNewPassword, setRepeatNewPassword ] = useState('');
  const [ newEmail, setNewEmail ] = useState(user.email);
  const [ newCurrency, setNewCurrency ] = useState(user.currency);
  const [ modalUserOpen, setModalUserOpen ] = useState(false);
  const [ modalPasswordOpen, setModalPasswordOpen ] = useState(false);
  const [ modalEmailOpen, setModalEmailOpen ] = useState(false);
  const [ modalCurrencyOpen, setModalCurrencyOpen ] = useState(false);
  const [ errorUsername, setErrorUsername ] = useState('');
  const [ errorEmail, setErrorEmail ] = useState('');
  const [ errorPassword, setErrorPassword ] = useState('');
  const [ errorRepeatPassword, setErrorRepeatPassword ] = useState('');


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

  const handleSave = async () => {
    if(newUserName !== user.userName) {
      userNameErrorValidation();
    } else if(newPassword !== user.password) {
      passwordErrorValidation();
      repeatPassErrorValidation();
    } else if(newEmail !== user.email) {
      emailErrorValidation();
    }

    if(!errorUsername && !errorPassword && !errorRepeatPassword && !errorEmail) {
      const newUser = {...user, userName: newUserName, password: newPassword, email: newEmail, currency: newCurrency}
      
      let existingUsers = await AsyncStorage.getItem('userData');
      existingUsers = JSON.parse(existingUsers);
      let userIndex;
      existingUsers.map((userItem, index) => {
        if(user.email.toLowerCase() === userItem.email.toLowerCase()) {
          userIndex = index;
        }
      });
      existingUsers.splice(userIndex, 1);
      if(existingUsers && newUser) {
        await AsyncStorage.setItem('userData', JSON.stringify([...existingUsers, newUser]))
        dispatch(setUser(newUser));
      }
    } else {
      setNewUserName(user.userName);
      setNewPassword(user.password);
      setNewEmail(user.email);
    }
  }

  const Setting = ({ title, value, onPress, arrow }) => {
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

  /* input validations */

  const userNameErrorValidation = () => {
    setErrorUsername(newUserName.length == 0 ? 'Your user name must not be empty' : '');
  };

  const emailErrorValidation = () => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setErrorEmail(newEmail.length == 0 ? 'Your email must not be empty' :
    !newEmail.match(mailformat) ? 'Please introduce a valid email' :  '');
  };

  const passwordErrorValidation = () => {
    const passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
    setErrorPassword(newPassword.length == 0 ? 'Your password must not be empty' : 
    !newPassword.match(passformat) ? 'Minimum 6 characters (at least one uppercase, one lowercase and one number)' : '');
  };

  const repeatPassErrorValidation = () => {
    setErrorRepeatPassword(newPassword !== user.password && repeatNewPassword.length == 0 ? 'This field must not be empty' : 
    repeatNewPassword !== newPassword ? 'Passwords do not match' : '');
  };

  /* / input validations */
  

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
            onPress={() => setModalUserOpen(true)}
          />
          <ModalSettings 
            modalOpen={modalUserOpen}
            closeModal={setModalUserOpen}
            currentValue={newUserName}
            newInputValue={setNewUserName}
            title="Name"
            handleSave={handleSave}
            errorMessage={errorUsername}
            onFocus={() => setErrorUsername('')}
            onBlur={() => userNameErrorValidation()}
          />
          <Setting 
            title="Email"
            value={user.email}
            arrow={true}
            onPress={() => setModalEmailOpen(true)}
          />
          <ModalSettings 
            modalOpen={modalEmailOpen}
            closeModal={setModalEmailOpen}
            currentValue={newEmail}
            newInputValue={setNewEmail}
            title="Email"
            handleSave={handleSave}
            keyboardInputType={'email-address'}
            errorMessage={errorEmail}
            onFocus={() => setErrorEmail('')}
            onBlur={() => emailErrorValidation()}
          />
          <Setting 
            title="Currency"
            value={user.currency.toUpperCase()}
            arrow={true}
            onPress={() => setModalCurrencyOpen(true)}
          />
          <ModalSettings 
            modalOpen={modalCurrencyOpen}
            closeModal={setModalCurrencyOpen}
            currentValue={newCurrency}
            newInputValue={setNewCurrency}
            title="Currency"
            handleSave={handleSave}
          />

          <SectionTitle title="SECURITY" />
          <Setting 
            title="Password"
            value=""
            arrow={true}
            onPress={() => setModalPasswordOpen(true)}
          />
          <ModalSettings 
            modalOpen={modalPasswordOpen}
            closeModal={setModalPasswordOpen}
            currentValue={newPassword}
            newInputValue={setNewPassword}
            title="Password"
            handleSave={handleSave}
            isPassword={true}
            currentValue2={repeatNewPassword}
            newInputValue2={setRepeatNewPassword}
            errorMessage={errorPassword}
            errorMessage2={errorRepeatPassword}
            onFocus={() => setErrorPassword('')}
            onFocus2={() => setErrorRepeatPassword('')}
            onBlur={() => passwordErrorValidation()}
            onBlur2={() => repeatPassErrorValidation()}
          />
          <Setting 
            title="Log out"
            value=""
            arrow={false}
            onPress={() => logOut()}
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
    modal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      color: COLORS.white,
      backgroundColor: COLORS.black
    },
    modalText: {
      color: COLORS.white,
    },
    textInput: {
      backgroundColor: COLORS.white,
      borderColor: COLORS.border,
      borderWidth: 1,
      paddingHorizontal: SIZES.padding / 2,
      width: 300,
      height: 50,
      alignItems: 'center',
      borderRadius: 5,
      margin: 10,
      maxWidth: '95%'
    },
    saveButton: {
      borderRadius: 5,
    }
})