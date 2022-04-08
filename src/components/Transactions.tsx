import moment from 'moment';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {
  Button,
  Checkbox,
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
import {colors, helpers} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {useMode, useSelect, useTransactions} from '../hooks';

function Transactions({
  category,
  limit = 0,
  additionalLimit = 7,
  startSpace = 0,
  isSearchResult = false,
  ignoreFilter = false,
  hasSelectMode = false,
}: {
  category?: transactionTypes.PaymentMethod;
  limit?: number;
  additionalLimit?: number;
  startSpace?: number;
  isSearchResult?: boolean;
  ignoreFilter?: boolean;
  hasSelectMode?: boolean;
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation<appTypes.Navigation>();

  const {selectionObject} = useSelect();

  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const {symbol} = useSelector((state: storeTypes.RootState) => state.currency);
  const {mode} = useSelector((state: storeTypes.RootState) => state.app);

  const {isSelectMode, isDefaultMode, setMode} = useMode();

  const [showMore, setShowMore] = useState(false);
  const [showMenu, setShowMenu] = useState(
    helpers.arrayToMap(transactions, 'id', false),
  );
  const txns = useTransactions({
    isSearchResult,
    limit,
    ignoreFilter,
    category,
    showMore,
  });

  useEffect(() => {
    const transactionSelection = helpers.arrayToMap(
      txns.modifiedTransactions,
      'id',
      selectTypes.Status.UNCHECKED,
    );

    selectionObject.set('transactions', transactionSelection);
  }, [txns.modifiedTransactions]);

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

  function handleView(transaction: transactionTypes.Transaction) {
    setShowMenu({...showMenu, [transaction.id]: false});
    dispatch(actions.transaction.select(transaction));
    navigation.navigate('EditScreen');
  }

  function handleSnackbar() {
    const onDismiss = () => dispatch(actions.snackbar.setNotVisible());

    const snackbar: Partial<snackbarTypes.State> = {
      message: 'Transaction deleted',
      actionLabel: 'Dismiss',
      actionOnpress: onDismiss,
      onDismiss,
    };

    dispatch(actions.snackbar.setVisible(snackbar));
  }

  function handleAlert(selectedId: string) {
    const onConfirm = () => {
      if (txns.modifiedTransactions.length === 1) navigation.goBack();
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
    setShowMenu({...showMenu, [selectedId]: false});
    handleAlert(selectedId);
  }
  const onMenuDismiss = (transactionId: string) => {
    setShowMenu({...showMenu, [transactionId]: false});
  };

  const onMenuPress = (transactionId: string) => {
    setShowMenu({...showMenu, [transactionId]: true});
  };

  // doesn't show menu as component
  const RightMenu = ({
    transaction,
  }: {
    transaction: transactionTypes.Transaction;
  }) => {
    return (
      <React.Fragment>
        <Menu.Item
          title="View"
          icon="view-list-outline"
          onPress={() => handleView(transaction)}
        />
        <Divider style={{marginHorizontal: 20, marginVertical: 10}} />
        <Menu.Item
          title="Delete"
          icon="trash-can-outline"
          titleStyle={{color: colors.danger}}
          onPress={() => handleDelete(transaction.id)}
        />
      </React.Fragment>
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

  useEffect(() => {
    // mode clean up
    return () => {
      setMode(appTypes.Mode.DEFAULT);
      selectionObject.setAll('transactions', selectTypes.Status.UNCHECKED);
    };
  }, []);

  if (transactions.length === 0) return <Text>Nothing here...</Text>;

  return (
    <ScrollView style={{paddingTop: startSpace}}>
      {txns.modifiedTransactions.map(
        (transaction: transactionTypes.Transaction, index: number) => {
          const icon = getIcon(transaction.paymentMethod);
          const date = moment(transaction.date).format('MMMM DD YYYY');
          const time = moment(transaction.date).format('hh:mm A');

          return (
            <Pressable
              style={{backgroundColor: colors.primary}}
              key={`transaction-list-item__${index}`}
              onLongPress={enableSelectMode}>
              {index > 0 && <Divider inset={true} />}
              <List.Item
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
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <IconButton
                      style={{
                        backgroundColor: colors.secondary,
                        borderRadius: 5,
                        marginHorizontal: 14,
                        marginTop: 12,
                      }}
                      color={colors.iconColor}
                      icon={icon}
                      size={20}
                    />
                    {txns.isSubscription(transaction.installment) && (
                      <IconButton
                        style={{margin: 0}}
                        size={18}
                        color={colors.iconButtonColor}
                        icon="repeat-variant"
                      />
                    )}
                  </View>
                )}
                right={() => (
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
                    {hasSelectMode && isSelectMode ? (
                      <RightSelect transaction={transaction} />
                    ) : (
                      <Menu
                        visible={showMenu[transaction.id]}
                        onDismiss={() => onMenuDismiss(transaction.id)}
                        anchor={
                          <IconButton
                            style={{
                              padding: 0,
                              margin: 0,
                              marginTop: 2,
                            }}
                            onPress={() => onMenuPress(transaction.id)}
                            size={20}
                            color={colors.mutedIcon}
                            icon="dots-vertical"
                          />
                        }>
                        <RightMenu transaction={transaction} />
                      </Menu>
                    )}
                  </View>
                )}
              />
            </Pressable>
          );
        },
      )}
      {!!limit && limit > 0 && limit < transactions.length && (
        <Button
          labelStyle={{color: colors.secondary, fontSize: 12}}
          onPress={() => setShowMore(!showMore)}>
          {showMore ? 'Show less' : 'Show more'}
        </Button>
      )}
    </ScrollView>
  );
}

export default Transactions;
