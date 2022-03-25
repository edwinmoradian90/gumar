import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {Header, SpreadSheet} from '.';
import {modalTypes, storeTypes} from '../types';
import {colors} from '../utils';

export default function Export() {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(
    (state: storeTypes.RootState) => state.account,
  );
  const {modalVisible} = useSelector(
    (state: storeTypes.RootState) => state.modal,
  );

  return (
    <ReactNativeModal
      style={styles.modalContainer}
      isVisible={modalVisible === modalTypes.ModalVisible.EXPORT}
      swipeDirection={['down']}
      onBackdropPress={() => dispatch(actions.modal.setNotVisible())}
      onSwipeComplete={() => dispatch(actions.modal.setNotVisible())}>
      <ScrollView style={styles.modalView}>
        <Header title="Export" left={['title']} right={['close']} />
        {isLoggedIn ? (
          <>
            <Text>Spread Sheet</Text>
            <SpreadSheet />
          </>
        ) : (
          <>
            <Text>Google sign in required.</Text>
            <Text>{'To sign in, go to Settings > Account'} </Text>
          </>
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
