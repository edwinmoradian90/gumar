import React, {useEffect, useMemo, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {ScrollView, View, StyleSheet, Text, Pressable} from 'react-native';
import {selectTypes, storeTypes, transactionTypes} from '../types';
import {colors, helpers} from '../utils';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {
  Appbar,
  Button,
  Checkbox,
  TextInput,
  Subheading,
  Divider,
} from 'react-native-paper';
import {useFilter, useModal, useSnackbar} from '../hooks';
import {useSelector} from 'react-redux';

export default function Filter({
  data,
}: {
  isVisible: boolean;
  setIsVisible: any;
  data?: any;
}) {
  const date = new Date();

  const filter = useFilter();
  const modal = useModal();
  const snackbar = useSnackbar();

  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );

  const {symbol} = useSelector((state: storeTypes.RootState) => state.currency);

  let d = data ? data : transactions;

  const {min, max} = useMemo(() => helpers.findMinMax(d, 'amount'), [d]);

  const [amountRange, setAmountRange] = useState({
    from: filter.data.amountRangeFrom,
    to: filter.data.amountRangeTo,
  });

  console.log(filter.data.amountRangeFrom);

  const [dateRange, setDateRange] = useState({
    from: filter.data.dateRangeFrom,
    to: filter.data.dateRangeTo,
  });

  const [toggleDateRange, setToggleDateRange] = useState({
    from: false,
    to: false,
  });

  const [name, setName] = useState('');

  function initialInstallmentState() {
    const installments: {[index: string]: selectTypes.Status} = {};
    const values = Object.values(transactionTypes.Installment);
    values.forEach((value: string) => {
      if (
        value === transactionTypes.Installment.NONE ||
        value === transactionTypes.Installment.OTHER
      )
        return;
      installments[value] = selectTypes.Status.UNCHECKED;
    });
    return installments;
  }

  const initialPaymentMethodState: {[index: string]: selectTypes.Status} =
    useMemo(() => {
      const paymentMethods: {[index: string]: selectTypes.Status} = {};
      const values = Object.values(transactionTypes.PaymentMethod);
      values.forEach(
        (value: string) =>
          (paymentMethods[value] =
            filter.data.paymentMethods.indexOf(paymentMethods[value]) > -1
              ? selectTypes.Status.CHECKED
              : selectTypes.Status.UNCHECKED),
      );

      return paymentMethods;
    }, [filter.data.paymentMethods]);

  const [installments, setInstallments] = useState(initialInstallmentState());
  const [paymentMethods, setPaymentMethods] = useState(
    initialPaymentMethodState,
  );

  function handleResetFilter() {
    filter.reset();

    setInstallments(initialInstallmentState);
    setPaymentMethods(initialPaymentMethodState);
    setAmountRange({from: '', to: ''});
    setDateRange({
      from: filter.data.dateRangeFrom,
      to: filter.data.dateRangeTo,
    });
    setName(filter.data.name);

    snackbar.createAndShow('Filter removed');
  }

  function handleSubmit() {
    const selectedPaymentMethods = Object.keys(paymentMethods).filter(
      (key: string) => paymentMethods[key] === selectTypes.Status.CHECKED,
    );

    const selectedInstallments = Object.keys(installments).filter(
      (key: string) => installments[key] === selectTypes.Status.CHECKED,
    );

    const amountRangeTo = amountRange.to || max;

    filter.update({
      isUsingFilter: true,
      name: name,
      paymentMethods: selectedPaymentMethods,
      installments: selectedInstallments,
      amountRangeFrom: amountRange.from,
      amountRangeTo: amountRangeTo,
      dateRangeFrom: dateRange.from,
      dateRangeTo: dateRange.to,
    });

    modal.hide();
    snackbar.createAndShow('Filter applied');
  }

  // useEffect(() => {
  //   if (!filter.isEnabled) handleResetFilter();
  // }, [filter.isEnabled, filter.data.paymentMethods]);

  const InstallmentOption = ({name, type}: {name: string; type: string}) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>{name}</Text>
        <Checkbox
          status={installments[type]}
          onPress={() => {
            const value =
              installments[type] === selectTypes.Status.CHECKED
                ? selectTypes.Status.UNCHECKED
                : selectTypes.Status.CHECKED;
            setInstallments({...installments, [type]: value});
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
        <Checkbox
          status={paymentMethods[type]}
          onPress={() => {
            const value =
              paymentMethods[type] === selectTypes.Status.CHECKED
                ? selectTypes.Status.UNCHECKED
                : selectTypes.Status.CHECKED;

            setPaymentMethods({...paymentMethods, [type]: value});
          }}
        />
      </View>
    );
  };

  console.log(filter.data.amountRangeTo);

  // useEffect(() => {
  //   setAmountRange({from: min, to: max});
  // }, [min, max]);

  return (
    <ReactNativeModal
      style={styles.modalContainer}
      isVisible={modal.isFilterModal}
      onBackdropPress={modal.hide}
      onSwipeComplete={modal.hide}>
      <Appbar.Header
        style={{
          backgroundColor: colors.background,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
          ...styles.header,
        }}
        dark={false}>
        <Appbar.Content title="Filter" />
        <Appbar.Action icon="close" onPress={() => modal.hide()} />
      </Appbar.Header>
      <ScrollView style={styles.modalView}>
        <View>
          <View style={{paddingBottom: 20}}>
            <Subheading style={{paddingBottom: 10}}>Name</Subheading>
            <TextInput
              style={{backgroundColor: colors.background}}
              label={'Transaction name'}
              mode="outlined"
              value={name}
              activeOutlineColor={colors.secondary}
              onChangeText={(name: string) => setName(name)}
            />
          </View>
          <Divider
            style={{backgroundColor: colors.muted, marginVertical: 20}}
          />
          <View style={{paddingBottom: 20}}>
            <Subheading style={{paddingBottom: 10}}>Amount Range</Subheading>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '45%'}}>
                <Text>From</Text>
                <TextInput
                  style={{backgroundColor: colors.background}}
                  keyboardType="numeric"
                  activeUnderlineColor={colors.secondary}
                  label={`Min ${symbol}${min}`}
                  value={amountRange.from}
                  onChangeText={(newAmount: string) =>
                    setAmountRange({
                      ...amountRange,
                      from: newAmount,
                    })
                  }
                />
              </View>
              <View style={{width: '45%'}}>
                <Text>To</Text>
                <TextInput
                  style={{backgroundColor: colors.background}}
                  keyboardType="numeric"
                  activeUnderlineColor={colors.secondary}
                  label={`Max ${symbol}${max}`}
                  value={amountRange.to}
                  onChangeText={(newAmount: string) =>
                    setAmountRange({...amountRange, to: newAmount})
                  }
                />
              </View>
            </View>
          </View>
          <Divider
            style={{backgroundColor: colors.muted, marginVertical: 20}}
          />
          <View>
            <Subheading style={{paddingBottom: 10}}>Date Range</Subheading>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
              </View>
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
              <View>
                <Text>To</Text>
                <Pressable
                  onPress={() =>
                    setToggleDateRange({...toggleDateRange, to: true})
                  }>
                  <Text>Select end date</Text>
                </Pressable>
                <Text>
                  {moment(dateRange.to).format('MMMM DD, YYYY') ||
                    'Not selected'}
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
          </View>
          <Divider
            style={{backgroundColor: colors.muted, marginVertical: 20}}
          />
          <View>
            <Subheading style={{paddingBottom: 10}}>Payment method</Subheading>
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
          <Divider
            style={{backgroundColor: colors.muted, marginVertical: 20}}
          />
          <View>
            <Subheading style={{paddingBottom: 10}}>Installment</Subheading>
            {Object.keys(installments).map((key: string, index: number) => {
              if (
                key === transactionTypes.Installment.NONE ||
                key === transactionTypes.Installment.OTHER
              )
                return;
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
        <Divider style={{backgroundColor: colors.muted, marginVertical: 20}} />
      </ScrollView>
      <View
        style={{
          shadowRadius: 2,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowColor: '#000000',
          elevation: 4,
          backgroundColor: colors.background,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingVertical: 10,
        }}>
        <Button
          labelStyle={{color: colors.secondary}}
          onPress={handleResetFilter}>
          Reset filter
        </Button>
        <Button
          mode="contained"
          style={{marginRight: 20}}
          labelStyle={{color: colors.white}}
          onPress={handleSubmit}>
          Apply
        </Button>
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
    marginTop: 20,
  },
  modalView: {
    backgroundColor: colors.primary,
    padding: 20,
  },
  header: {},
  contentContainer: {},
});
