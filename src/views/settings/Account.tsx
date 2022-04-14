import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Appbar,
  Divider,
  Headline,
  List,
  Paragraph,
  Subheading,
  Text,
} from 'react-native-paper';
import * as Component from '../../components';
import {useAccount} from '../../hooks';
import {colors} from '../../utils';

export default function Account() {
  const navigation = useNavigation();
  const account = useAccount();

  console.log(account.data, 'AC');

  return (
    <React.Fragment>
      <Appbar.Header style={styles.header} dark={false}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Account" />
      </Appbar.Header>
      <View style={styles.container}>
        <Headline>Connect to your google account</Headline>
        <Paragraph>
          To create spread sheets from within the app, you must be signed in to
          your google account.
        </Paragraph>
        <Divider style={{marginVertical: 30}} />
        {account.data.email && account.data.givenName ? (
          <View>
            <List.Item
              title="Name"
              description={account.data.givenName}
              left={() => <List.Icon icon="account-box-outline" />}
            />
            <List.Item
              title="Email"
              description={account.data.email}
              left={() => <List.Icon icon="email-outline" />}
            />

            <List.Item
              title="Status"
              description={account.isLoggedIn ? 'Signed in' : 'Signed out'}
              left={() => <List.Icon icon="check-network-outline" />}
            />
          </View>
        ) : (
          <Subheading style={{textAlign: 'center'}}>
            Looks like you haven't signed in before.
          </Subheading>
        )}
        <Component.Login />
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  header: {
    backgroundColor: colors.white,
    elevation: 0,
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
