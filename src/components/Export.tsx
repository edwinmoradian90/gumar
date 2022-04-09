import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../utils';
import {useAccount} from '../hooks';
import {Appbar, Subheading} from 'react-native-paper';
import * as Component from '../components';

export default function Export({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
}) {
  const account = useAccount();

  return (
    <ReactNativeModal
      style={styles.modalContainer}
      isVisible={isVisible}
      swipeDirection={['down']}
      onBackdropPress={() => setIsVisible(false)}
      onSwipeComplete={() => setIsVisible(false)}>
      <ScrollView style={styles.modalView}>
        <Appbar.Header
          style={{backgroundColor: colors.background, elevation: 0}}
          dark={false}>
          <Appbar.Content title="Export" />
          <Appbar.Action icon="close" onPress={() => setIsVisible(false)} />
        </Appbar.Header>
        <View style={styles.modalContent}>
          {account.isLoggedIn ? (
            <React.Fragment>
              <Subheading style={{paddingVertical: 10}}>
                Spread Sheet Information
              </Subheading>
              <Component.SpreadSheet setIsVisible={setIsVisible} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text>Google sign in required.</Text>
              <Text>{'To sign in, go to Settings > Account'} </Text>
            </React.Fragment>
          )}
        </View>
      </ScrollView>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    marginTop: 20,
  },
  modalView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
  },
  modalContent: {
    paddingHorizontal: 20,
  },
});
