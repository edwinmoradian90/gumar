import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import {login, logout} from '../redux/actions/account';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/types/store';
import {primary, secondary, white} from '../utils/colors';
import api from '../settings/config';

export default function Login() {
  const dispatch = useDispatch();
  const {isLoggedIn, accessToken} = useSelector(
    (state: RootState) => state.account,
  );
  function handleLogin() {
    dispatch(login());
  }

  function handleLogout() {
    dispatch(logout());
  }

  function handleUseAnotherAccount() {
    if (isLoggedIn) dispatch(logout());
    dispatch(login());
  }

  console.log({accessToken});

  useEffect(() => {
    GoogleSignin.configure(api.googleSigninConfig);
  }, []);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <Pressable style={[styles.button]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      ) : (
        <>
          <GoogleSigninButton
            style={styles.googleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleLogin}
            disabled={false}
          />
          <Pressable onPress={handleUseAnotherAccount}>
            <Text>Use another account</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
  googleButton: {
    height: 48,
    marginBottom: 20,
    width: 192,
  },
  button: {
    backgroundColor: secondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 100,
  },
  buttonText: {
    color: white,
    textAlign: 'center',
  },
});
