import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import api from '../settings/config';
import {storeTypes} from '../types';
import {colors} from '../utils';

export default function Login() {
  const dispatch = useDispatch();
  const {isLoggedIn, accessToken} = useSelector(
    (state: storeTypes.RootState) => state.account,
  );
  function handleLogin() {
    dispatch(actions.account.login());
  }

  function handleLogout() {
    dispatch(actions.account.logout());
  }

  function handleUseAnotherAccount() {
    if (isLoggedIn) dispatch(actions.account.logout());
    dispatch(actions.account.login());
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
    backgroundColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 100,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
  },
});
