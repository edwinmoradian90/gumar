import React, {useRef} from 'react';
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
import {colors} from '../utils';
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
      console.log('new edit target', editTarget, newEditTarget);
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
    const updatedTransaction = {...selected, [editTargetRef.current]: data};

    closeWithRef();

    dispatch(actions.transaction.update(selected.id, updatedTransaction));
    dispatch(actions.transaction.select(updatedTransaction));

    clearContent();
  }

  function save(data: any) {
    let key =
      editTarget === appTypes.EditTarget.TIME
        ? appTypes.EditTarget.DATE
        : editTarget;

    const updatedTransaction = {...selected, [key]: data};

    close();

    dispatch(actions.transaction.update(selected.id, updatedTransaction));
    dispatch(actions.transaction.select(updatedTransaction));

    clearContent();
  }

  const NameSection = () => {
    return (
      <List.Item
        left={() => <List.Icon icon="draw-pen" />}
        title="Name"
        description={() => (
          <>
            {editTarget === appTypes.EditTarget.NAME ? (
              <TextInput
                autoFocus
                style={{backgroundColor: colors.altBackground}}
                onChangeText={(content: string) => setContent(content)}
                placeholder="Name"
                defaultValue={selected.name}
                onEndEditing={() => save(content.current)}
              />
            ) : (
              <Text>{selected.name}</Text>
            )}
          </>
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
          <>
            {editTarget === appTypes.EditTarget.AMOUNT ? (
              <TextInput
                autoFocus
                style={{backgroundColor: colors.altBackground}}
                keyboardType="numeric"
                onChangeText={(content: string) => setContent(content)}
                placeholder="Amount"
                defaultValue={content.current}
                onEndEditing={() => save(content.current)}
              />
            ) : (
              <Text>
                {currencySymbol}
                {selected.amount}
              </Text>
            )}
          </>
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
          <>
            {editTarget === appTypes.EditTarget.DATE ? (
              <DatePicker
                modal
                mode="date"
                androidVariant="iosClone"
                open={editTarget === appTypes.EditTarget.DATE}
                date={selected.date}
                onConfirm={(date: Date) => save(date)}
                onCancel={close}
              />
            ) : (
              <Text>{date}</Text>
            )}
          </>
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
          <>
            {editTarget === appTypes.EditTarget.TIME ? (
              <DatePicker
                modal
                mode="time"
                androidVariant="iosClone"
                open={editTarget === appTypes.EditTarget.TIME}
                date={selected.date}
                onConfirm={(date: Date) => {
                  console.log(date);
                  save(date);
                }}
                onCancel={close}
              />
            ) : (
              <Text>{time}</Text>
            )}
          </>
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
          <>
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
          </>
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
          </React.Fragment>
        )}
      </ScrollView>
    </React.Fragment>
  );
}

export default React.memo(Edit);
