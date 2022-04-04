import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import api from '../settings/config';
import {colors} from '../utils';
import {ActivityIndicator, Button} from 'react-native-paper';
import {useAccount} from '../hooks';

export default function Login() {
  const [submitted, setSubmitted] = useState(false);
  const account = useAccount();

  function handleLogout() {
    setSubmitted(true);
    account.logout();
  }

  useEffect(() => {
    GoogleSignin.configure(api.googleSigninConfig);
  }, []);

  useEffect(() => {
    if (submitted && account.isLoadingStatus) setSubmitted(false);
  }, [submitted, account.isLoadingStatus]);

  return (
    <View style={styles.container}>
      {account.isLoggedIn ? (
        <View style={styles.loginContainer}>
          <ActivityIndicator animating={submitted && account.isLoadingStatus} />
          <Button labelStyle={styles.button} onPress={handleLogout}>
            Sign out
          </Button>
        </View>
      ) : (
        <React.Fragment>
          <GoogleSigninButton
            style={styles.googleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={account.login}
            disabled={false}
          />
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
  },
  googleButton: {
    height: 48,
    marginBottom: 20,
    width: 192,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    color: colors.text,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
  },
});
