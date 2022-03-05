import React, {useState} from 'react';
import {View, Pressable, Text, TextInput} from 'react-native';
import uuid from 'react-native-uuid';
import {appendTransaction} from '../redux/actions/transaction';
import {Transaction} from '../types/app';
import ReactNativeModal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {setModalNotVisible} from '../redux/actions/modal';
import newTransactionStyles from '../styles/newTransaction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RootState} from '../redux/types/store';
import {ModalVisible} from '../redux/types/modal';
import {splitDate} from '../utils/helpers';

export default function NewTransaction() {
  const dispatch = useDispatch();
  const {modalVisible} = useSelector((state: RootState) => state.modal);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  function onSubmit() {
    try {
      const id = uuid.v4() as string;
      const date = new Date();
      const splitDateValues = splitDate(date);
      const newTransaction: Transaction = {
        id,
        name,
        amount,
        date,
        ...splitDateValues,
      };

      dispatch(appendTransaction(newTransaction));
      dispatch(setModalNotVisible());

      setName('');
      setAmount('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ReactNativeModal
      style={newTransactionStyles.modalContainer}
      isVisible={modalVisible === ModalVisible.ADD}
      swipeDirection={['down']}
      onBackdropPress={() => dispatch(setModalNotVisible())}
      onSwipeComplete={() => dispatch(setModalNotVisible())}>
      <View style={newTransactionStyles.modalView}>
        <View style={newTransactionStyles.container}>
          <View style={newTransactionStyles.header}>
            <Text style={newTransactionStyles.headerTitle}>
              New Transaction
            </Text>
            <Pressable
              style={newTransactionStyles.closeButton}
              onPress={() => dispatch(setModalNotVisible())}>
              <AntDesign name="close" size={18} />
            </Pressable>
          </View>
          <TextInput onChangeText={name => setName(name)} placeholder="Name" />
          <TextInput
            onChangeText={amount => setAmount(amount)}
            placeholder="Amount"
            keyboardType="numeric"
          />
          <Pressable
            style={[
              newTransactionStyles.button,
              newTransactionStyles.buttonSubmit,
            ]}
            onPress={onSubmit}>
            <Text style={newTransactionStyles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </ReactNativeModal>
  );
}
