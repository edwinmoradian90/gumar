import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Header, Login} from '../../components';
import {storeTypes} from '../../types';
import {colors} from '../../utils';

export default function Account() {
  const {isLoggedIn, email, givenName} = useSelector(
    (state: storeTypes.RootState) => state.account,
  );

  return (
    <>
      <Header title="Account" left={['back', 'title']} />
      <View style={styles.container}>
        <View>
          <Text>{givenName}</Text>
          <Text>{email}</Text>
          <Text style={styles.loginStatusText}>
            {isLoggedIn ? 'Logged in' : 'Logged out'}
          </Text>
        </View>
        <Login />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
  },
  loginStatusText: {},
  authButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    marginRight: 20,
    width: 100,
  },
  authButtonText: {
    color: colors.white,
    textAlign: 'center',
  },
});
