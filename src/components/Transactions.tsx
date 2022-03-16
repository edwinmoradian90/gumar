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
import {storeTypes, transactionTypes} from '../types';
import {helpers} from '../utils';

function Transactions({
  filter,
  sortBy,
  limit,
}: {
  filter?: (transaction: transactionTypes.Transaction) => boolean;
  sortBy?: (a: any, b: any) => -1 | 1 | 0;
  limit?: number;
}) {
  const dispatch = useDispatch();
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
        if (!filter) return true;
        return filter(transaction);
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
          const date = moment(transaction.date).format('MMMM DD YYYY, hh:mm A');
          return (
            <View key={`transaction-list-item__${index}`}>
              <Divider inset={true} />
              <List.Item
                title={transaction.name}
                titleStyle={{fontSize: 18, fontWeight: 'bold'}}
                description={date}
                descriptionStyle={{fontSize: 12}}
                left={() => <List.Icon icon={icon} />}
                right={() => (
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>{`${symbol}${transaction.amount}`}</Text>
                    <Menu
                      visible={showMenu[transaction.id]}
                      onDismiss={() =>
                        setShowMenu({...showMenu, [transaction.id]: false})
                      }
                      anchor={
                        <IconButton
                          onPress={() => {
                            setShowMenu({...showMenu, [transaction.id]: true});
                          }}
                          color={Colors.grey500}
                          icon="dots-vertical"
                        />
                      }>
                      <Menu.Item title="View" icon="view-list-outline" />
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
                onConfirm={() =>
                  dispatch(actions.transaction.remove(transaction.id))
                }
                onDeny={() => setShowAlert(false)}
              />
            </View>
          );
        },
      )}
      {limit && limit > 0 && limit < transactions.length && (
        <Button onPress={toggleShowMore}>
          {showMore ? 'Show less' : 'Show more'}
        </Button>
      )}
    </ScrollView>
  );
}

export default Transactions;
