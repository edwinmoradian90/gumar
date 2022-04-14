import React, {useRef} from 'react';
import uuid from 'react-native-uuid';
import {ScrollView, View} from 'react-native';
import {Headline, Text, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  alertTypes,
  appTypes,
  snackbarTypes,
  storeTypes,
  transactionTypes,
} from '../types';
import {actions} from '../redux';
import {style} from '../styles';
import {Picker} from '@react-native-picker/picker';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {colors, _} from '../utils';
import moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map';

function Edit() {
  const dispatch = useDispatch();
  const navigation = useNavigation<appTypes.Navigation>();

  const {name} = useSelector((state: storeTypes.RootState) => state.currency);
  const currencySymbol = getSymbolFromCurrency(name) || '$';
  const {selected} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const {editTarget} = useSelector((state: storeTypes.RootState) => state.app);

  const content = useRef<string>('');
  const editTargetRef = useRef(appTypes.EditTarget.NONE);

  const date = moment(selected.date).format('MMMM DD YYYY');
  const time = moment(selected.date).format('hh:mm A');

  function setContent(data: string) {
    content.current = data;
  }

  function clearContent() {
    content.current = '';
  }

  // move
  function handleSnackbar(): void {
    const onDismiss = () => dispatch(actions.snackbar.setNotVisible());
    const snackbar: Partial<snackbarTypes.State> = {
      message: 'Transaction deleted',
      actionLabel: 'Dismiss',
      actionOnpress: onDismiss,
      onDismiss,
    };

    dispatch(actions.snackbar.setVisible(snackbar));
  }

  function handleAlert(selectedId: string): void {
    const onConfirm = () => {
      navigation.goBack();
      dispatch(actions.transaction.remove(selectedId));
      dispatch(actions.alert.setNotVisible());
      handleSnackbar();
    };
    const onDismiss = () => dispatch(actions.alert.setNotVisible());

    const alert: Partial<alertTypes.State> = {
      title: 'Are you sure?',
      body: 'This action is not reversible. Delete transaction?',
      confirm: 'Delete',
      deny: 'Cancel',
      onDeny: onDismiss,
      onConfirm,
      onDismiss,
    };

    dispatch(actions.alert.setVisible(alert));
  }

  const handleDelete = (selectedId: string) => handleAlert(selectedId);

  // Picker closes on rerender so we save change to ref to avoid rerender
  function onPressWithRef(newEditTarget: appTypes.EditTarget) {
    return () => {
      if (editTargetRef.current !== newEditTarget) {
        editTargetRef.current = newEditTarget;
      }
    };
  }

  function onPress(newEditTarget: appTypes.EditTarget) {
    return () => {
      if (editTarget !== newEditTarget) {
        dispatch(actions.app.setEditTarget(newEditTarget));
      }

      setContent(selected[newEditTarget]);
    };
  }

  function closeWithRef() {
    editTargetRef.current = appTypes.EditTarget.NONE;
  }

  function close() {
    dispatch(actions.app.setEditTarget(appTypes.EditTarget.NONE));
  }

  function saveWithRef(data: any) {
    const transaction = {...selected, [editTargetRef.current]: data};

    closeWithRef();

    dispatch(actions.transaction.update(selected.id, transaction));
    dispatch(actions.transaction.select(transaction));

    clearContent();
  }

  function save(data: any) {
    let key =
      editTarget === appTypes.EditTarget.TIME
        ? appTypes.EditTarget.DATE
        : editTarget;

    let transaction = {...selected, [key]: data};

    const isSubscription = _.transactions.isSubscription({
      transaction,
    });

    const hasSubscriptionId = _.transactions.hasSubscriptionId(transaction);

    // refactor later
    if (isSubscription) {
      if (!hasSubscriptionId) {
        const subscriptionId = uuid.v4();
        transaction = {...transaction, subscriptionId};
      }
    } else {
      if (hasSubscriptionId) {
        transaction = {...transaction, subscriptionId: null};
      }
    }

    close();

    dispatch(actions.transaction.update(selected.id, transaction));
    dispatch(actions.transaction.select(transaction));

    clearContent();
  }

  const NameSection = () => {
    return (
      <List.Item
        left={() => <List.Icon icon="draw-pen" />}
        title="Name"
        description={() => (
          <React.Fragment>
            {editTarget === appTypes.EditTarget.NAME ? (
              <TextInput
                autoFocus
                style={{backgroundColor: colors.altBackground}}
                onChangeText={(content: string) => setContent(content)}
                placeholder="Name"
                defaultValue={selected.name}
                onEndEditing={() => save(content.current || selected.name)}
              />
            ) : (
              <Text>{selected.name}</Text>
            )}
          </React.Fragment>
        )}
        onPress={onPress(appTypes.EditTarget.NAME)}
      />
    );
  };

  const AmountSection = () => {
    return (
      <List.Item
        left={() => <List.Icon icon="cash-multiple" />}
        title="Amount"
        description={() => (
          <React.Fragment>
            {editTarget === appTypes.EditTarget.AMOUNT ? (
              <TextInput
                autoFocus
                style={{backgroundColor: colors.altBackground}}
                keyboardType="numeric"
                onChangeText={(content: string) => setContent(content)}
                placeholder="Amount"
                defaultValue={content.current}
                onEndEditing={() => save(content.current || selected.amount)}
              />
            ) : (
              <Text>
                {currencySymbol}
                {selected.amount}
              </Text>
            )}
          </React.Fragment>
        )}
        onPress={onPress(appTypes.EditTarget.AMOUNT)}
      />
    );
  };

  const DateSection = () => {
    const dateObj = new Date(selected.date);

    return (
      <List.Item
        left={() => (
          <List.Icon color={colors.iconButtonColor} icon="calendar" />
        )}
        title="Date"
        description={() => (
          <React.Fragment>
            {editTarget === appTypes.EditTarget.DATE ? (
              <DatePicker
                modal
                mode="date"
                androidVariant="iosClone"
                open={editTarget === appTypes.EditTarget.DATE}
                date={dateObj}
                onConfirm={(date: Date) => save(date)}
                onCancel={close}
              />
            ) : (
              <Text>{date}</Text>
            )}
          </React.Fragment>
        )}
        onPress={onPress(appTypes.EditTarget.DATE)}
      />
    );
  };

  const TimeSection = () => {
    const dateObj = new Date(selected.date);

    return (
      <List.Item
        left={() => (
          <List.Icon
            color={colors.iconButtonColor}
            icon="clock-time-five-outline"
          />
        )}
        title="Time"
        description={() => (
          <React.Fragment>
            {editTarget === appTypes.EditTarget.TIME ? (
              <DatePicker
                modal
                mode="time"
                androidVariant="iosClone"
                open={editTarget === appTypes.EditTarget.TIME}
                date={dateObj}
                onConfirm={(date: Date) => {
                  save(date);
                }}
                onCancel={close}
              />
            ) : (
              <Text>{time}</Text>
            )}
          </React.Fragment>
        )}
        onPress={onPress(appTypes.EditTarget.TIME)}
      />
    );
  };

  const PaymentMethodSection = () => {
    return (
      <List.Item
        left={() => (
          <List.Icon
            color={colors.iconButtonColor}
            icon="credit-card-search-outline"
          />
        )}
        title="Payment method"
        description={() => (
          <React.Fragment>
            <Picker
              style={{height: 60}}
              onFocus={onPressWithRef(appTypes.EditTarget.PAYMENT_METHOD)}
              selectedValue={selected.paymentMethod}
              onValueChange={(paymentMethod: transactionTypes.PaymentMethod) =>
                saveWithRef(paymentMethod)
              }>
              <Picker.Item
                value={transactionTypes.PaymentMethod.CASH}
                label="Cash"
              />
              <Picker.Item
                value={transactionTypes.PaymentMethod.CREDIT}
                label="Credit"
              />
              <Picker.Item
                value={transactionTypes.PaymentMethod.DEBIT}
                label="Debit"
              />
              <Picker.Item
                value={transactionTypes.PaymentMethod.CHECK}
                label="Check"
              />
              <Picker.Item
                value={transactionTypes.PaymentMethod.OTHER}
                label="Other"
              />
            </Picker>
          </React.Fragment>
        )}
      />
    );
  };

  const InstallmentSection = () => {
    return (
      <List.Item
        left={() => (
          <List.Icon color={colors.iconButtonColor} icon="timetable" />
        )}
        title="Installment"
        description={() => (
          <React.Fragment>
            <Picker
              style={{height: 60}}
              onFocus={onPressWithRef(appTypes.EditTarget.INSTALLMENT)}
              selectedValue={selected.installment}
              onValueChange={(installment: transactionTypes.Installment) =>
                saveWithRef(installment)
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
                label="Quarterly"
                value={transactionTypes.Installment.QUARTERLY}
              />
              <Picker.Item
                label="Semiannually"
                value={transactionTypes.Installment.SEMI_ANNUALLY}
              />
              <Picker.Item
                label="Annually"
                value={transactionTypes.Installment.ANNUALLY}
              />
            </Picker>
          </React.Fragment>
        )}
      />
    );
  };

  return (
    <React.Fragment>
      <Appbar.Header style={{backgroundColor: colors.background, elevation: 0}}>
        <Appbar.BackAction
          color={colors.iconButtonColor}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content color={colors.title} title={selected.name} />
        <Appbar.Action
          icon="trash-can-outline"
          color={colors.iconButtonColor}
          onPress={() => handleDelete(selected.id)}
        />
      </Appbar.Header>
      <ScrollView style={style.edit.container}>
        {selected && (
          <View style={style.edit.snapshotContainer}>
            <Headline>
              {currencySymbol}
              {selected.amount}
            </Headline>
            <Text style={style.edit.snapshotName}>{selected.name}</Text>
            <Text style={style.edit.snapshotDate}>{date}</Text>
            <Text>{time}</Text>
          </View>
        )}
        {selected && (
          <React.Fragment>
            <NameSection />
            <AmountSection />
            <DateSection />
            <TimeSection />
            <PaymentMethodSection />
            <InstallmentSection />
          </React.Fragment>
        )}
      </ScrollView>
    </React.Fragment>
  );
}

export default React.memo(Edit);
