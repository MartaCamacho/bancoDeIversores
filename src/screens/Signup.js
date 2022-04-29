import { StyleSheet, Text, View, Image, TextInput, Dimensions, Alert } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogged, setUser } from '../redux/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonComponent from '../components/ButtonComponent';

/**
 * Signup page
 * @typedef PropType
 * @property {Object} navigation navigation object to change pages
 */
const Signup = ({ navigation }) => {
  const [ userName, setUserName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const [ userNameError, setUserNameError ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ repeatPasswordError, setRepeatPasswordError ] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    userNameErrorValidation();
    emailErrorValidation();
    passwordErrorValidation();
    repeatPassErrorValidation();
    if(!userNameError, !emailError, !passwordError, !repeatPasswordError, 
      email !== '', userName !== '', password !== '', repeatPassword !== '') {
      try {
        AsyncStorage.getItem('userData').then((result) => {
          const user = JSON.parse(result);
          const userData = { email, password, userName, currency: 'eur', holdings: [] };

          const setUserFunction = (item) => {
            AsyncStorage.setItem('userData', item);
            dispatch(setLogged(true));
            dispatch(setUser(userData));
            navigation.navigate('Home');
          };
          if(user !== null) {
            let userAlreadyRegistered = false;
              user.map(userItem => {
              if(userItem.email === email) {
                userAlreadyRegistered = true;
                return Alert.alert('', 'This email is already registered');
              }
            });
            if(!userAlreadyRegistered) {
              return setUserFunction(JSON.stringify([...user, userData]));
            }
          } else {
            return setUserFunction(JSON.stringify([userData]));
          }
        })
        .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* input validations */

  const userNameErrorValidation = () => {
    setUserNameError(userName.length == 0 ? 'Your user name must not be empty' : '');
  };

  const emailErrorValidation = () => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmailError(email.length == 0 ? 'Your email must not be empty' :
    !email.match(mailformat) ? 'Please introduce a valid email' :  '');
  };

  const passwordErrorValidation = () => {
    const passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
    setPasswordError(password.length == 0 ? 'Your password must not be empty' : 
    !password.match(passformat) ? 'Minimum 6 characters (at least one uppercase, one lowercase and one number)' : '');
  };

  const repeatPassErrorValidation = () => {
    setRepeatPasswordError(repeatPassword.length == 0 ? 'This field must not be empty' : 
    repeatPassword !== password ? 'Passwords do not match' : '');
  };

  /* / input validations */

  const errorMessage = (field) => <Text style={styles.errorMessage}>{field}</Text>;

  const windowHeight = Dimensions.get('window').height;

  return (
    <KeyboardAwareScrollView>
      <View style={[styles.body, {minHeight: windowHeight}]}>
        <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
        />
        <Text style={styles.title}>
          Signup
        </Text>
        <TextInput 
          style={styles.input}
          onChangeText={(value) => setUserName(value)}
          onFocus={() => setUserNameError('')}
          onBlur={() => userNameErrorValidation()}
          value={userName}
          placeholder='Enter your name'
        />
        {userNameError.length > 0 && errorMessage(userNameError)}
        <TextInput 
          style={styles.input}
          onChangeText={(value) => setEmail(value.toLowerCase())}
          onFocus={() => setEmailError('')}
          onBlur={() => emailErrorValidation()}
          keyboardType='email-address'
          textContentType='emailAddress'
          value={email}
          placeholder='Enter your email'
        />
        {emailError.length > 0 && errorMessage(emailError)}
        <TextInput 
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          onFocus={() => setPasswordError('')}
          onBlur={() => passwordErrorValidation()}
          value={password}
          textContentType='newPassword'
          placeholder='Enter your password'
        />
        {passwordError.length > 0 && errorMessage(passwordError)}
        <TextInput 
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => setRepeatPassword(value)}
          onFocus={() => setRepeatPasswordError('')}
          onBlur={() => repeatPassErrorValidation()}
          value={repeatPassword}
          textContentType='newPassword'
          placeholder='Repeat your password'
        />
        {repeatPasswordError.length > 0 && errorMessage(repeatPasswordError)}
        <Text style={styles.textLink}>
        Already have an account? <Text style={styles.textLinkAnchor}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
        <ButtonComponent 
          title='Signup'
          color='#B0191E'
          onPressFunction={handleSubmit}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Signup

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#141414',
  },
  title: {
    height: 50,
    color: '#fff',
    fontSize: 30
  },
  textLink: {
    color: '#fff',
    textAlign: 'right',
    width: 300,
    maxWidth: '95%',
    marginTop: 10,
    marginBottom: 40
  },
  textLinkAnchor: {
    color: '#fff',
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  logo: {
    width: 186,
    height: 112,
    margin: 20
  },
  input: {
    width: 300,
    maxWidth: '95%',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10
  },
  errorMessage: {
    color: '#B0191E',
    width: 300,
    maxWidth: '95%',
  }
})