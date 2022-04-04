import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import uuid from 'react-native-uuid';
import * as Component from '../components';
import {View, Pressable, Text} from 'react-native';
import {Button, Colors, Subheading, TextInput} from 'react-native-paper';
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
import {colors, helpers} from '../utils';
import {Appbar} from 'react-native-paper';
import newTransactionStyles from '../styles/newTransaction';

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
        message: `Transaction added to "${helpers.capitalize(paymentMethod)}"`,
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
    <ReactNativeModal
      style={style.newTransaction.modalContainer}
      isVisible={modalVisible === modalTypes.ModalVisible.ADD}
      swipeDirection={['down']}
      onBackdropPress={() => dispatch(actions.modal.setNotVisible())}
      onSwipeComplete={() => dispatch(actions.modal.setNotVisible())}>
      <View style={style.newTransaction.modalView}>
        <Appbar.Header
          style={{backgroundColor: colors.white, elevation: 0}}
          dark={false}>
          <Appbar.Content title="Create Transaction" />
          <Component.AppbarActions.ModalCloseButton />
        </Appbar.Header>
        <View style={style.newTransaction.container}>
          <Subheading>Transaction name</Subheading>
          <TextInput
            style={style.newTransaction.input}
            mode="outlined"
            label="Name"
            outlineColor={colors.white}
            activeOutlineColor={colors.secondary}
            onChangeText={name => setName(name)}
          />
          <Subheading>Transaction amount</Subheading>
          <TextInput
            style={style.newTransaction.input}
            mode="outlined"
            label="Amount"
            outlineColor={colors.white}
            activeOutlineColor={colors.secondary}
            onChangeText={amount => setAmount(amount)}
            keyboardType="numeric"
          />
          <Subheading>Payment type</Subheading>
          <Picker
            style={style.newTransaction.input}
            selectedValue={paymentMethod || transactionTypes.PaymentMethod.CASH}
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
          <Button labelStyle={newTransactionStyles.button} onPress={onSubmit}>
            Add
          </Button>
        </View>
      </View>
    </ReactNativeModal>
  );
}
