import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import Login from '../../components/Login';
import {RootState} from '../../redux/types/store';
import {primary, white} from '../../utils/colors';

export default function Account() {
  const {isLoggedIn, email, givenName} = useSelector(
    (state: RootState) => state.account,
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
    backgroundColor: primary,
  },
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
  },
  loginStatusText: {},
  authButton: {
    backgroundColor: primary,
    borderRadius: 5,
    padding: 10,
    marginRight: 20,
    width: 100,
  },
  authButtonText: {
    color: white,
    textAlign: 'center',
  },
});
