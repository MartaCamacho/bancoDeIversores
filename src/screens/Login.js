import { StyleSheet, Text, View, Image, TextInput, Alert, Dimensions } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogged, setUser } from '../redux/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonComponent from '../components/ButtonComponent';

const Login = ({ navigation }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const dispatch = useDispatch();
  
  const handleLogin = async () => {
    emailErrorValidation();
    passwordErrorValidation();

    if(!emailError, !passwordError) {
      try {
        const userData = () => AsyncStorage.getItem('userData').then((result) => {
          const users = JSON.parse(result);
          let userFound = false;
          if(users) {
            users.map(user => {
              if(user.email === email && user.password === password) {
                dispatch(setLogged(true));
                dispatch(setUser(user));
                userFound = true;
                navigation.navigate('Home'); 
              }
            });
          }

          if(!userFound) {
            Alert.alert('', 'Incorrect user or password');
          }
        })
        .catch((err) => console.log(err));
        userData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* input validations */

  const emailErrorValidation = () => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmailError(email.length == 0 ? 'Your email must not be empty' :
    !email.match(mailformat) ? 'Please introduce a valid email' :  '');
  };

  const passwordErrorValidation = () => {
    setPasswordError(password.length == 0 ? 'Your password must not be empty' : 
    password.length < 6 ? 'Your password should have at least 6 characters' : '');
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
        <Text style={styles.text}>
          Login
        </Text>
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
          textContentType='password'
          placeholder='Enter your password'
        />
        {passwordError.length > 0 && errorMessage(passwordError)}
        <Text style={styles.textLink}>
          If you do not have an account, <Text style={{color: 'blue'}}
            onPress={() => navigation.navigate('Signup')}>
            signup
          </Text>
        </Text>
        <ButtonComponent 
          title='Login'
          color='#B0191E'
          onPressFunction={handleLogin}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#141414',
  },
  text: {
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
    marginBottom: 30
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