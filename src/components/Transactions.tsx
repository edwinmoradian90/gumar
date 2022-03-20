import moment from 'moment';
import React, {useMemo, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Alert} from '.';
import {
  Button,
  Colors,
  Divider,
  IconButton,
  List,
  Menu,
  Text,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {appTypes, storeTypes, transactionTypes} from '../types';
import {colors, filter, helpers} from '../utils';
import {useNavigation} from '@react-navigation/native';

function Transactions({
  //   filter,
  paymentMethod,
  dateRangeFrom,
  dateRangeTo,
  sortBy,
  limit,
}: {
  //   filter?: (transaction: transactionTypes.Transaction) => boolean;
  paymentMethod?: transactionTypes.PaymentMethod;
  dateRangeFrom?: string;
  dateRangeTo?: string;
  sortBy?: (a: any, b: any) => -1 | 1 | 0;
  limit?: number;
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation<appTypes.Navigation>();

  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const {symbol} = useSelector((state: storeTypes.RootState) => state.currency);
  const [showMore, setShowMore] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // fix type
  const scrollRef: any = useRef(null);

  // add to redux
  const additionalLimit = 7;

  const modifiedTransactions = useMemo(() => {
    console.log('WOEO');
    if (transactions.length === 0) return [];

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

  function setMenuState() {
    const menus: {[index: string]: boolean} = {};
    modifiedTransactions.forEach(
      (transaction: transactionTypes.Transaction) =>
        (menus[transaction.id] = false),
    );
    return menus;
  }

  const [showMenu, setShowMenu] = useState(setMenuState());

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
    // fix later
    if (showMore) scrollRef?.current?.scrollTo({y: 0, animated: true});
    setShowMore(!showMore);
  }

  function handleView(transaction: transactionTypes.Transaction) {
    setShowMenu({...showMenu, [transaction.id]: false});
    dispatch(actions.transaction.select(transaction));
    navigation.navigate('EditScreen');
  }

  function handleDelete(transactionId: string) {
    setShowAlert(true);
    setShowMenu({...showMenu, [transactionId]: false});
  }

  if (transactions.length === 0) return <Text>Nothing here...</Text>;

  return (
    <ScrollView ref={scrollRef}>
      {modifiedTransactions.map(
        (transaction: transactionTypes.Transaction, index: number) => {
          const icon = getIcon(transaction.paymentMethod);
          const date = moment(transaction.date).format('MMMM DD YYYY');
          const time = moment(transaction.date).format('hh:mm A');

          return (
            <View
              style={{backgroundColor: colors.primary}}
              key={`transaction-list-item__${index}`}>
              <Divider inset={true} />
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
                right={() => (
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 20,
                        fontWeight: '300',
                      }}>{`${symbol}${transaction.amount}`}</Text>
                    <Menu
                      visible={showMenu[transaction.id]}
                      onDismiss={() =>
                        setShowMenu({...showMenu, [transaction.id]: false})
                      }
                      anchor={
                        <IconButton
                          style={{
                            padding: 0,
                            margin: 0,
                            marginTop: 2,
                          }}
                          onPress={() =>
                            setShowMenu({...showMenu, [transaction.id]: true})
                          }
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
                  </View>
                )}
              />
              <Alert
                title="Are you sure?"
                body="This action is not reversible. Delete transaction?"
                confirm="Delete"
                deny="Cancel"
                visible={showAlert}
                onDismiss={() => setShowAlert(false)}
                onConfirm={() => {
                  if (modifiedTransactions.length === 1) navigation.goBack();
                  dispatch(actions.transaction.remove(transaction.id));
                }}
                onDeny={() => setShowAlert(false)}
              />
            </View>
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
