import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from './Header';
import SpreadSheets from './SpreadSheets';
import {RootState} from '../redux/types/store';
import ReactNativeModal from 'react-native-modal';
import {setModalNotVisible} from '../redux/actions/modal';
import {ModalVisible} from '../redux/types/modal';
import {white} from '../utils/colors';

export default function Export() {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state: RootState) => state.account);
  const {modalVisible} = useSelector((state: RootState) => state.modal);
  return (
    <ReactNativeModal
      style={styles.modalContainer}
      isVisible={modalVisible === ModalVisible.EXPORT}
      swipeDirection={['down']}
      onBackdropPress={() => dispatch(setModalNotVisible())}
      onSwipeComplete={() => dispatch(setModalNotVisible())}>
      <ScrollView style={styles.modalView}>
        <Header title="Export" left={['title']} right={['close']} />
        {isLoggedIn ? (
          <>
            <Text>Spread Sheet</Text>
            <SpreadSheets />
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
    backgroundColor: white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    padding: 20,
  },
});
