import React, {useEffect, useMemo, useRef, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import {Header} from '.';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {Picker} from '@react-native-picker/picker';
import {modalTypes, storeTypes, transactionTypes} from '../types';
import {colors, helpers} from '../utils';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import {RootState} from '../types/store';

export default function Filter({data}: {data: any}) {
  const date = new Date();
  const dispatch = useDispatch();
  const {min, max} = useMemo(() => helpers.findMinMax(data, 'amount'), [data]);
  const {modalVisible} = useSelector(
    (state: storeTypes.RootState) => state.modal,
  );
  const filterState = useSelector((state: RootState) => state.filter);
  const [amountRange, setAmountRange] = useState({
    from: min,
    to: max,
  });
  const [dateRange, setDateRange] = useState({
    from: filterState.dateRangeFrom,
    to: filterState.dateRangeTo,
  });
  const [toggleDateRange, setToggleDateRange] = useState({
    from: false,
    to: false,
  });
  const [name, setName] = useState('');

  function initialInstallmentState() {
    const installments: {[index: string]: boolean} = {};
    const values = Object.values(transactionTypes.Installment);
    values.forEach((value: string) => {
      installments[value] = filterState.installments.indexOf(value) > -1;
    });
    return installments;
  }

  function initialPaymentMethodState() {
    const paymentMethods: {[index: string]: boolean} = {};
    const values = Object.values(transactionTypes.PaymentMethod);
    values.forEach(
      (value: string) =>
        (paymentMethods[value] =
          filterState.paymentMethods.indexOf(value) > -1),
    );

    return paymentMethods;
  }

  const [installments, setInstallments] = useState(initialInstallmentState());
  const [paymentMethods, setPaymentMethods] = useState(
    initialPaymentMethodState(),
  );

  function handleResetFilter() {
    dispatch(actions.filter.clear());
  }

  function handleSubmit() {
    const selectedPaymentMethods = Object.keys(paymentMethods).filter(
      (key: string) => paymentMethods[key],
    );
    const selectedInstallments = Object.keys(installments).filter(
      (key: string) => installments[key],
    );

    const filter = {
      isUsingFilter: true,
      name: name,
      paymentMethods: selectedPaymentMethods,
      installments: selectedInstallments,
      amountRangeFrom: amountRange.from,
      amountRangeTo: amountRange.to,
      dateRangeFrom: dateRange.from,
      dateRangeTo: dateRange.to,
    };

    dispatch(actions.filter.create(filter));
    dispatch(actions.modal.setNotVisible());
  }

  const InstallmentOption = ({name, type}: {name: string; type: string}) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>{name}</Text>
        <CheckBox
          value={installments[type]}
          onValueChange={(isChecked: boolean) => {
            setInstallments({...installments, [type]: isChecked});
          }}
        />
      </View>
    );
  };

  const PaymentMethodOption = ({name, type}: {name: string; type: string}) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>{name}</Text>
        <CheckBox
          value={paymentMethods[type]}
          onValueChange={(isChecked: boolean) => {
            setPaymentMethods({...paymentMethods, [type]: isChecked});
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    setAmountRange({from: min, to: max});
  }, [min, max]);

  return (
    <ReactNativeModal
      style={styles.modalContainer}
      isVisible={modalVisible === modalTypes.ModalVisible.FILTER}
      swipeDirection={['down']}
      onBackdropPress={() => dispatch(actions.modal.setNotVisible())}
      onSwipeComplete={() => dispatch(actions.modal.setNotVisible())}>
      <ScrollView style={styles.modalView}>
        <Header title="Filter" left={['title']} right={['close']} />
        <Pressable onPress={handleResetFilter}>
          <Text>Reset filter</Text>
        </Pressable>
        <View style={styles.contentContainer}>
          <Text>Filter</Text>
          <View>
            <Text>Name</Text>
            <TextInput
              placeholder="Transaction name"
              onChangeText={(name: string) => setName(name)}
            />
          </View>
          <View>
            <Text>Amount Range</Text>
            <View>
              <Text>From</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Starting amount"
                defaultValue={amountRange.from}
                onChangeText={(newAmount: string) =>
                  setAmountRange({
                    ...amountRange,
                    from: newAmount,
                  })
                }
              />
              <Text>To</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Ending amount"
                defaultValue={amountRange.to}
                onChangeText={(newAmount: string) =>
                  setAmountRange({...amountRange, to: newAmount})
                }
              />
            </View>
          </View>
          <View>
            <Text>Date Range</Text>
            <View>
              <Text>From</Text>
              <Pressable
                onPress={() =>
                  setToggleDateRange({...toggleDateRange, from: true})
                }>
                <Text>Select start date</Text>
              </Pressable>
              <Text>
                {moment(dateRange.from).format('MMMM DD, YYYY') ||
                  'Not selected'}
              </Text>
              <DatePicker
                title="Select start date"
                androidVariant="iosClone"
                mode="date"
                modal
                open={toggleDateRange.from}
                date={dateRange.from || date}
                onConfirm={(date: Date) => {
                  setDateRange({...dateRange, from: date});
                  setToggleDateRange({from: false, to: false});
                }}
                onCancel={() => setToggleDateRange({from: false, to: false})}
              />
              <Text>To</Text>
              <Pressable
                onPress={() =>
                  setToggleDateRange({...toggleDateRange, to: true})
                }>
                <Text>Select end date</Text>
              </Pressable>
              <Text>
                {moment(dateRange.to).format('MMMM DD, YYYY') || 'Not selected'}
              </Text>
              <DatePicker
                modal
                title="Select end date"
                androidVariant="iosClone"
                mode="date"
                open={toggleDateRange.to}
                date={dateRange.to || date}
                onConfirm={(date: Date) => {
                  setDateRange({...dateRange, to: date});
                  setToggleDateRange({from: false, to: false});
                }}
                onCancel={() =>
                  setToggleDateRange({...toggleDateRange, to: false})
                }
              />
            </View>
          </View>
          <View>
            <Text>Payment method</Text>
            {Object.keys(paymentMethods).map((key: string, index: number) => {
              const name = helpers.capitalize(key);
              return (
                <PaymentMethodOption
                  key={`payment-option__${index}`}
                  name={name}
                  type={key}
                />
              );
            })}
          </View>
          <View>
            <Text>Installment</Text>
            {Object.keys(installments).map((key: string, index: number) => {
              const name = helpers.capitalize(key);
              return (
                <InstallmentOption
                  key={`installment-option__${index}`}
                  name={name}
                  type={key}
                />
              );
            })}
          </View>
        </View>
        <Button title="Apply" onPress={handleSubmit} />
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
  contentContainer: {},
});
