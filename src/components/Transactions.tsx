import moment from 'moment';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {
  Button,
  Checkbox,
  Colors,
  Divider,
  IconButton,
  List,
  Menu,
  Text,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {
  alertTypes,
  appTypes,
  selectTypes,
  snackbarTypes,
  storeTypes,
  transactionTypes,
} from '../types';
import {colors, filter, helpers} from '../utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelect, useTransactions} from '../hooks';

function Transactions({
  paymentMethod,
  dateRangeFrom,
  dateRangeTo,
  sortBy,
  limit,
  startSpace = 0,
  isSearchResult = false,
}: {
  //   filter?: (transaction: transactionTypes.Transaction) => boolean;
  paymentMethod?: transactionTypes.PaymentMethod;
  dateRangeFrom?: string;
  dateRangeTo?: string;
  sortBy?: (a: any, b: any) => -1 | 1 | 0;
  limit?: number;
  startSpace?: number;
  isSearchResult?: boolean;
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation<appTypes.Navigation>();

  const {selectionObject} = useSelect();

  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const search = useSelector((state: storeTypes.RootState) => state.search);
  const {symbol} = useSelector((state: storeTypes.RootState) => state.currency);
  const {mode} = useSelector((state: storeTypes.RootState) => state.app);
  const transactions2 = useTransactions({});
  console.log(transactions2.length);

  const [showMore, setShowMore] = useState(false);

  // add to redux
  const additionalLimit = 7;

  // TODO: make hook
  const modifiedTransactions: transactionTypes.Transaction[] = useMemo(() => {
    if (transactions.length === 0) return [];

    // TODO: extract out
    if (search.results.length > 0 && isSearchResult)
      return search.results.sort(sortBy || helpers.compare.adate);

    return transactions
      .filter((transaction: transactionTypes.Transaction) => {
        return filter.apply([
          filter.conditions.paymentMethod(transaction, paymentMethod),
          filter.conditions.dateRange(transaction, dateRangeFrom, dateRangeTo),
        ]);
      })
      .sort(sortBy || helpers.compare.adate)
      .slice(
        0,
        (limit && (showMore ? limit + additionalLimit : limit)) ||
          transactions.length,
      );
  }, [transactions, limit, showMore, filter, sortBy]);

  useEffect(() => {
    const transactionSelection = helpers.arrayToMap(
      modifiedTransactions,
      'id',
      selectTypes.Status.UNCHECKED,
    );
    const menuSelection = helpers.arrayToMap(modifiedTransactions, 'id', false);

    selectionObject.set('transactions', transactionSelection);
    selectionObject.set('menu', menuSelection);
    // selectionObject.clear();
  }, []);

  // move to helpers
  function getIcon(paymentMethod: transactionTypes.PaymentMethod) {
    switch (paymentMethod) {
      case transactionTypes.PaymentMethod.CASH:
        return 'cash';
      case transactionTypes.PaymentMethod.CREDIT:
        return 'credit-card-outline';
      case transactionTypes.PaymentMethod.DEBIT:
        return 'bank-outline';
      case transactionTypes.PaymentMethod.CHECK:
        return 'checkbook';
      case transactionTypes.PaymentMethod.OTHER:
        return 'hand-coin-outline';
      default:
        return 'cash';
    }
  }

  function toggleShowMore() {
    setShowMore(!showMore);
  }

  function handleView(transaction: transactionTypes.Transaction) {
    const key = transaction.id;
    const menuSelection = selectionObject.get('menu');

    selectionObject.set('menu', {...menuSelection, [key]: false});
    dispatch(actions.transaction.select(transaction));
    navigation.navigate('EditScreen');
  }

  function handleSnackbar() {
    const onDismiss = () => dispatch(actions.snackbar.setNotVisible());

    const snackbar: Partial<snackbarTypes.State> = {
      message: 'Transaction deleted.',
      actionLabel: 'Dismiss',
      actionOnpress: onDismiss,
      onDismiss,
    };

    dispatch(actions.snackbar.setVisible(snackbar));
  }

  function handleAlert(selectedId: string) {
    const onConfirm = () => {
      if (modifiedTransactions.length === 1) navigation.goBack();
      dispatch(actions.alert.setNotVisible());
      dispatch(actions.transaction.remove(selectedId));
      handleSnackbar();
    };

    const onDismiss = () => dispatch(actions.alert.setNotVisible());

    const alert: Partial<alertTypes.State> = {
      title: 'Are you sure?',
      body: 'This action is irreversible. Delete transaction?',
      confirm: 'Delete',
      deny: 'Cancel',
      onDeny: onDismiss,
      onConfirm,
      onDismiss,
    };

    dispatch(actions.alert.setVisible(alert));
  }

  function enableSelectMode() {
    if (mode !== appTypes.Mode.SELECT) {
      const onDismiss = () => dispatch(actions.snackbar.setNotVisible());

      const snackbar: Partial<snackbarTypes.State> = {
        message: 'Select mode enabled',
        actionLabel: 'Dismiss',
        actionOnpress: onDismiss,
        onDismiss,
      };

      dispatch(actions.app.setMode(appTypes.Mode.SELECT));
      dispatch(actions.snackbar.setVisible(snackbar));
    }
  }

  function handleDelete(selectedId: string) {
    const menuSelection = selectionObject.get('menu');

    selectionObject.set('menu', {...menuSelection, [selectedId]: false});
    handleAlert(selectedId);
  }

  // doesn't show menu as component
  const RightMenu = ({
    transaction,
  }: {
    transaction: transactionTypes.Transaction;
  }) => {
    const key = transaction.id;
    const menuSelection = selectionObject.get('menu');
    const visible = menuSelection[key];

    const onDismiss = () => {
      const data = {...menuSelection, [key]: false};
      selectionObject.set('menu', data);
    };

    const onPress = () => {
      const data = {...menuSelection, [key]: true};
      selectionObject.set('menu', data);
    };

    console.log(selectionObject.get('menu'));

    return (
      <Menu
        visible={visible}
        onDismiss={onDismiss}
        anchor={
          <IconButton
            style={{
              padding: 0,
              margin: 0,
              marginTop: 2,
            }}
            onPress={onPress}
            size={20}
            color={colors.mutedIcon}
            icon="dots-vertical"
          />
        }>
        <Menu.Item
          title="View"
          icon="view-list-outline"
          onPress={() => handleView(transaction)}
        />
        <Divider style={{marginHorizontal: 20, marginVertical: 10}} />
        <Menu.Item
          title="Delete"
          icon="trash-can-outline"
          titleStyle={{color: Colors.red500}}
          onPress={() => handleDelete(transaction.id)}
        />
      </Menu>
    );
  };

  const RightSelect = ({
    transaction,
  }: {
    transaction: transactionTypes.Transaction;
  }) => {
    const key = transaction.id;
    const transactionsObject = selectionObject.get('transactions');
    const value =
      transactionsObject[key] === selectTypes.Status.CHECKED
        ? selectTypes.Status.UNCHECKED
        : selectTypes.Status.CHECKED;

    function onPress() {
      selectionObject.set('transactions', {
        ...transactionsObject,
        [key]: value,
      });
    }

    return (
      <Checkbox.Android status={transactionsObject[key]} onPress={onPress} />
    );
  };

  if (transactions.length === 0) return <Text>Nothing here...</Text>;

  return (
    <ScrollView style={{paddingTop: startSpace}}>
      {modifiedTransactions.map(
        (transaction: transactionTypes.Transaction, index: number) => {
          const icon = getIcon(transaction.paymentMethod);
          const date = moment(transaction.date).format('MMMM DD YYYY');
          const time = moment(transaction.date).format('hh:mm A');

          return (
            <Pressable
              style={{backgroundColor: colors.primary}}
              key={`transaction-list-item__${index}`}
              onLongPress={enableSelectMode}>
              <Divider inset={true} />
              <List.Item
                key={`transaction-list-item__${index}`}
                title={transaction.name}
                titleStyle={{fontSize: 16, fontWeight: '300'}}
                description={() => (
                  <React.Fragment>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginTop: 2,
                      }}>
                      <IconButton
                        style={{
                          padding: 0,
                          margin: 0,
                          marginTop: 2,
                          marginRight: 3,
                          marginLeft: -3,
                        }}
                        size={12}
                        icon="calendar"
                        color={colors.muted}
                      />
                      <Text
                        style={{
                          color: colors.muted,
                          fontSize: 12,
                          fontWeight: '300',
                        }}>
                        {date}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}>
                      <IconButton
                        style={{
                          padding: 0,
                          margin: 0,
                          marginRight: 3,
                          marginLeft: -3,
                        }}
                        size={12}
                        icon="clock-time-five-outline"
                        color={colors.muted}
                      />
                      <Text
                        style={{
                          color: colors.muted,
                          fontSize: 12,
                          fontWeight: '300',
                        }}>
                        {time}
                      </Text>
                    </View>
                  </React.Fragment>
                )}
                left={() => (
                  <IconButton
                    style={{
                      backgroundColor: colors.secondary,
                      borderRadius: 5,
                      marginTop: 14,
                      marginLeft: 14,
                      marginRight: 10,
                    }}
                    color={colors.iconColor}
                    icon={icon}
                    size={20}
                  />
                )}
                right={() => {
                  const key = transaction.id;
                  const menuSelection = selectionObject.get('menu');
                  const visible = menuSelection[key];

                  const onDismiss = () => {
                    const data = {...menuSelection, [key]: false};
                    selectionObject.set('menu', data);
                  };

                  const onPress = () => {
                    const data = {...menuSelection, [key]: true};
                    selectionObject.set('menu', data);
                  };

                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 16,
                          fontWeight: '300',
                        }}>{`${symbol}${transaction.amount}`}</Text>
                      {mode === appTypes.Mode.SELECT && (
                        <RightSelect transaction={transaction} />
                      )}
                      {mode === appTypes.Mode.DEFAULT && (
                        <Menu
                          visible={visible}
                          onDismiss={onDismiss}
                          anchor={
                            <IconButton
                              style={{
                                padding: 0,
                                margin: 0,
                                marginTop: 2,
                              }}
                              onPress={onPress}
                              size={20}
                              color={colors.mutedIcon}
                              icon="dots-vertical"
                            />
                          }>
                          <Menu.Item
                            title="View"
                            icon="view-list-outline"
                            onPress={() => handleView(transaction)}
                          />
                          <Divider
                            style={{marginHorizontal: 20, marginVertical: 10}}
                          />
                          <Menu.Item
                            title="Delete"
                            icon="trash-can-outline"
                            titleStyle={{color: Colors.red500}}
                            onPress={() => handleDelete(transaction.id)}
                          />
                        </Menu>
                      )}
                    </View>
                  );
                }}
              />
            </Pressable>
          );
        },
      )}
      {limit && limit > 0 && limit < transactions.length && (
        <Button
          labelStyle={{fontSize: 12, color: colors.secondary}}
          onPress={toggleShowMore}>
          {showMore ? 'Show less' : 'Show more'}
        </Button>
      )}
    </ScrollView>
  );
}

export default Transactions;
