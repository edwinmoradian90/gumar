import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import * as Component from '../components';
import {View} from 'react-native';
import {Button, Subheading, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {style} from '../styles';
import {appTypes, modalTypes, storeTypes, transactionTypes} from '../types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {colors} from '../utils';
import {Appbar} from 'react-native-paper';
import newTransactionStyles from '../styles/newTransaction';
import {useAppData, useModal, useSnackbar, useTransactions} from '../hooks';

export default function NewTransaction({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: any;
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation<appTypes.Navigation>();
  const {modalVisible} = useSelector(
    (state: storeTypes.RootState) => state.modal,
  );
  const transactions = useTransactions();
  const snackbar = useSnackbar();
  const modal = useModal();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(
    transactionTypes.PaymentMethod.CASH,
  );
  const [installment, setInstallment] = useState(
    transactionTypes.Installment.SINGLE,
  );

  function resetState() {
    setName('');
    setAmount('');
    setPaymentMethod(transactionTypes.PaymentMethod.CASH);
    setInstallment(transactionTypes.Installment.SINGLE);
  }

  function onSubmit() {
    const {transactionId} = transactions.create(
      name,
      amount,
      paymentMethod,
      installment,
    );

    setIsVisible(false);
    snackbar.createAndShow('Transaction created');
    resetState();
  }

  return (
    <ReactNativeModal
      style={style.newTransaction.modalContainer}
      isVisible={isVisible}
      swipeDirection={['down']}
      onBackdropPress={() => setIsVisible(false)}
      onSwipeComplete={() => setIsVisible(false)}>
      <View style={style.newTransaction.modalView}>
        <Appbar.Header
          style={{backgroundColor: colors.white, elevation: 0}}
          dark={false}>
          <Appbar.Content title="Create Transaction" />
          <Appbar.Action icon="close" onPress={() => setIsVisible(false)} />
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
          <Subheading>Installment type</Subheading>
          <Picker
            style={style.newTransaction.input}
            selectedValue={installment || transactionTypes.Installment.SINGLE}
            onValueChange={(itemValue: transactionTypes.Installment) =>
              setInstallment(itemValue)
            }>
            <Picker.Item
              label="Single"
              value={transactionTypes.Installment.SINGLE}
            />
            <Picker.Item
              label="Daily"
              value={transactionTypes.Installment.DAILY}
            />
            <Picker.Item
              label="Weekly"
              value={transactionTypes.Installment.WEEKLY}
            />
            <Picker.Item
              label="Biweekly"
              value={transactionTypes.Installment.BIWEEKLY}
            />
            <Picker.Item
              label="Monthly"
              value={transactionTypes.Installment.MONTHLY}
            />
            <Picker.Item
              label="Semiannually"
              value={transactionTypes.Installment.SEMI_ANNUALLY}
            />
            <Picker.Item
              label="Annually"
              value={transactionTypes.Installment.ANNUALLY}
            />
            <Picker.Item
              label="Other"
              value={transactionTypes.Installment.OTHER}
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
