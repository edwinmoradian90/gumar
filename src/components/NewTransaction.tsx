import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, Pressable, Text, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {style} from '../styles';
import {
  appTypes,
  modalTypes,
  snackbarTypes,
  storeTypes,
  transactionTypes,
} from '../types';
import {useNavigation} from '@react-navigation/native';

export default function NewTransaction() {
  const dispatch = useDispatch();
  const navigation = useNavigation<appTypes.Navigation>();
  const {modalVisible} = useSelector(
    (state: storeTypes.RootState) => state.modal,
  );

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(
    transactionTypes.PaymentMethod.CASH,
  );

  function onSubmit() {
    try {
      const id = uuid.v4() as string;
      const date = new Date();
      const newTransaction: transactionTypes.Transaction = {
        id,
        name,
        amount,
        date,
        paymentMethod,
      };

      dispatch(actions.transaction.append(newTransaction));
      dispatch(actions.modal.setNotVisible());

      const actionOnpress = () => {
        dispatch(actions.transaction.select(newTransaction));
        dispatch(actions.snackbar.setNotVisible());
        navigation.navigate('EditScreen');
      };
      const snackbar: Partial<snackbarTypes.State> = {
        visible: true,
        message: `Transaction added to "${paymentMethod}".`,
        onDismiss: () => dispatch(actions.snackbar.setNotVisible()),
        actionLabel: 'View',
        actionOnpress,
      };

      dispatch(actions.snackbar.setVisible(snackbar));

      setName('');
      setAmount('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <ReactNativeModal
        style={style.newTransaction.modalContainer}
        isVisible={modalVisible === modalTypes.ModalVisible.ADD}
        swipeDirection={['down']}
        onBackdropPress={() => dispatch(actions.modal.setNotVisible())}
        onSwipeComplete={() => dispatch(actions.modal.setNotVisible())}>
        <View style={style.newTransaction.modalView}>
          <View style={style.newTransaction.container}>
            <View style={style.newTransaction.header}>
              <Text style={style.newTransaction.headerTitle}>
                New Transaction
              </Text>
              <Pressable
                style={style.newTransaction.closeButton}
                onPress={() => dispatch(actions.modal.setNotVisible())}>
                <AntDesign name="close" size={18} />
              </Pressable>
            </View>
            <Text>Transaction name</Text>
            <TextInput
              style={style.newTransaction.input}
              onChangeText={name => setName(name)}
              placeholder="Name"
            />
            <Text>Transaction amount</Text>
            <TextInput
              style={style.newTransaction.input}
              onChangeText={amount => setAmount(amount)}
              placeholder="Amount"
              keyboardType="numeric"
            />
            <Text>Payment type</Text>
            <Picker
              style={style.newTransaction.input}
              selectedValue={paymentMethod}
              onValueChange={(itemValue: transactionTypes.PaymentMethod) =>
                setPaymentMethod(itemValue)
              }>
              <Picker.Item
                label="Cash"
                value={transactionTypes.PaymentMethod.CASH}
              />
              <Picker.Item
                label="Credit"
                value={transactionTypes.PaymentMethod.CREDIT}
              />
              <Picker.Item
                label="Debit"
                value={transactionTypes.PaymentMethod.DEBIT}
              />
              <Picker.Item
                label="Check"
                value={transactionTypes.PaymentMethod.CHECK}
              />
              <Picker.Item
                label="Other"
                value={transactionTypes.PaymentMethod.OTHER}
              />
            </Picker>
            <Pressable
              style={[
                style.newTransaction.button,
                style.newTransaction.buttonSubmit,
              ]}
              onPress={onSubmit}>
              <Text style={style.newTransaction.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
}
