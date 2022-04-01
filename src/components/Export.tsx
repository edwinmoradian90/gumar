import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../utils';
import {useAccount, useModal} from '../hooks';
import {Appbar, Subheading} from 'react-native-paper';
import * as Component from '../components';
import {Subheader} from 'react-native-paper/lib/typescript/components/List/List';

export default function Export() {
  const modal = useModal();
  const account = useAccount();

  return (
    <ReactNativeModal
      style={styles.modalContainer}
      isVisible={modal.isExportModal}
      swipeDirection={['down']}
      onBackdropPress={modal.hide}
      onSwipeComplete={modal.hide}>
      <ScrollView style={styles.modalView}>
        <Appbar.Header
          style={{backgroundColor: colors.background, elevation: 0}}
          dark={false}>
          <Appbar.Content title="Export" />
          <Component.AppbarActions.ModalCloseButton />
        </Appbar.Header>
        <View style={styles.modalContent}>
          {account.isLoggedIn ? (
            <React.Fragment>
              <Subheading>Spread Sheet</Subheading>
              <Component.SpreadSheet />
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
    flex: 1,
    paddingVertical: 20,
  },
  modalContent: {
    paddingHorizontal: 20,
  },
});
