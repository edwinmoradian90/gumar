import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Header, SpreadSheet} from '.';
import {colors} from '../utils';
import {useAccount, useModal} from '../hooks';

export default function Export() {
  const modal = useModal();
  const account = useAccount();

  console.log(modal.isExportModal);

  return (
    <ReactNativeModal
      style={styles.modalContainer}
      isVisible={modal.isExportModal}
      swipeDirection={['down']}
      onBackdropPress={modal.hide}
      onSwipeComplete={modal.hide}>
      <ScrollView style={styles.modalView}>
        <Header title="Export" left={['title']} right={['close']} />
        {account.isLoggedIn ? (
          <React.Fragment>
            <Text>Spread Sheet</Text>
            <SpreadSheet />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Text>Google sign in required.</Text>
            <Text>{'To sign in, go to Settings > Account'} </Text>
          </React.Fragment>
        )}
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
    padding: 20,
  },
});
