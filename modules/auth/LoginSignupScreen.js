import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '../../data/firebaseInit';
import { addUserFirestore } from '../../data/firebaseApi';
import Loader from 'react-native-three-dots-loader';

export default function LoginSignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailerror, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailInputFocused, setIsEmailInputFocused] = useState(false);
  const [isPasswordInputfoucused, setIsPasswordInputFocused] = useState(false);
  const [isNameInputFocused, setIsNameInputFocused] = useState(false);
  const [result, setResult] = useState(null);

  const [isSignupScreen, setIsSignupScreen] = useState(true);

  const handlePress = async () => {
    try {
      setLoading(true);
      if (isSignupScreen) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await addUserFirestore(userCredential?.user?.uid, { name: name });
      }
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmailError = () => {
    if (
      !email ||
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  const checkNameError = () => {
    if (!name) {
      return true;
    } else {
      return false;
    }
  };
  const checkPasswordError = () => {
    if (!password || password.length < 6) {
      return true;
    } else {
      return false;
    }
  };
  console.log(checkEmailError(), checkPasswordError());
  const disableContinueButton = isSignupScreen
    ? checkEmailError() || checkPasswordError() || checkNameError()
    : checkEmailError() || checkPasswordError();
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50,
      }}
    >
      <Text style={styles.headerText}>
        {isSignupScreen
          ? 'Create A New Account'
          : 'Login With Existing Account'}
      </Text>
      <View style={{ marginTop: 30 }}>
        <TextInput
          type='text'
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
          onBlur={() => {
            setIsEmailInputFocused(false);
            checkEmailError()
              ? setEmailError('Please Provide A valid email')
              : setEmailError('');
          }}
          style={[
            styles.inputStyle,
            isEmailInputFocused ? styles.focusedInput : {},
          ]}
          onFocus={() => setIsEmailInputFocused(true)}
        />
        {emailerror && <Text style={styles.erroTextStyle}>{emailerror}</Text>}
        <TextInput
          type='text'
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          onBlur={() => {
            setIsPasswordInputFocused(false);
            checkPasswordError()
              ? setPasswordError('Please Provide A valid password')
              : setPasswordError('');
          }}
          style={[
            styles.inputStyle,
            isPasswordInputfoucused ? styles.focusedInput : {},
          ]}
          onFocus={() => setIsPasswordInputFocused(true)}
        />
        {passwordError ? (
          <Text style={styles.erroTextStyle}>{passwordError}</Text>
        ) : (
          <Text style={styles.passwordHelper}>
            Password should be greater than 6 leangth
          </Text>
        )}
        {isSignupScreen ? (
          <>
            <TextInput
              type='text'
              placeholder='Name'
              onChangeText={(text) => setName(text)}
              onBlur={() => {
                setIsNameInputFocused(false);
                checkNameError()
                  ? setNameError('Please Provide A valid name')
                  : setNameError('');
              }}
              style={[
                styles.inputStyle,
                isNameInputFocused ? styles.focusedInput : {},
              ]}
              onFocus={() => setIsNameInputFocused(true)}
            />
            {nameError ? (
              <Text style={styles.erroTextStyle}>{nameError}</Text>
            ) : null}
          </>
        ) : null}

        <View id='recaptcha-container'></View>

        <View style={{ display: 'flex', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={handlePress}
            style={[
              styles.continueButton,
              disableContinueButton || loading ? styles.disableButton : {},
            ]}
          >
            {loading ? (
              <Loader background='white' size={10} />
            ) : (
              <Text style={styles.buttonText}>
                {isSignupScreen ? 'Register ' : 'Login'}
              </Text>
            )}
          </TouchableOpacity>
          <Text
            style={styles.infoText}
            onPress={() => setIsSignupScreen((prev) => !prev)}
          >
            {isSignupScreen
              ? ' You Already hvae an Account? Sign In'
              : "You Don't have an account?  sign up"}
          </Text>
        </View>

        {/* <button
              onClick={() => continueWithPhoneNumber()}
              className='phone_screen_button'
              disabled={disableContinueButton}
              style={{ opacity: disableContinueButton ? 0.3 : 1 }}
            >
              Continue
            </button> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  phoneNUmberWrapper: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  enterTextStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3d4152',
    marginTop: 20,
  },
  erroTextStyle: {
    fontSize: 12,
    fontWeight: '400',
    color: 'red',
    marginTop: 10,
    paddingLeft: 10,
  },

  inputStyle: {
    borderRadius: 10,

    borderWidth: 1,
    borderColor: '#e3e1e1',
    width: 340,
    backgroundColor: '#fbf8f8',
    maxWidth: 320,
    height: 50,
    marginTop: 10,
    paddingLeft: 15,
    fontSize: 15,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: '#0e59f0',
  },
  continueButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 250,
    height: 50,
    border: 0,
    backgroundColor: '#246bfd',

    borderRadius: 10,

    marginTop: 30,
  },
  disableButton: {
    opacity: 0.3,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
  infoText: {
    color: '#0e59f0',
    marginTop: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#246bfd',
    marginTop: 100,
  },
  passwordHelper: {
    fontSize: 12,
    color: '#aaa',
    paddingLeft: 10,
  },
});
