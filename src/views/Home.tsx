import moment from 'moment';
import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import * as Component from '../components';
import {actions} from '../redux';
import homeStyles from '../styles/home';
import {
  appTypes,
  transactionTypes,
  storeTypes,
  modalTypes,
  sortTypes,
} from '../types';
import {colors, helpers} from '../utils';
import {Appbar, Button, Card, Colors, Searchbar} from 'react-native-paper';
import useTotal from '../hooks/useTotal';

export default function Home() {
  const navigation = useNavigation<appTypes.Navigation>();
  const dispatch = useDispatch();
  const [total, symbol] = useTotal();
  const [totalMonth, monthSymbol] = useTotal({
    dateRangeFrom: moment().startOf('month').format('YYYY-MM-DD hh:mm'),
    dateRangeTo: moment().endOf('month').format('YYYY-MM-DD hh:mm'),
  });

  const {transactions, status} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );

  const filterState = useSelector(
    (state: storeTypes.RootState) => state.filter,
  );
  const {sortBy, isDescending} = useSelector(
    (state: storeTypes.RootState) => state.sort,
  );

  function filter(item: any) {
    if (!filterState.isUsingFilter) return true;

    console.log(filterState);

    if (filterState.name && filterState.name !== item.name) return false;
    if (
      filterState.paymentMethods.length > 0 &&
      filterState.paymentMethods.indexOf(item.paymentMethod) < 0
    ) {
      return false;
    }
    if (
      filterState.installments.length > 0 &&
      filterState.installments.indexOf(item.installment) < 0
    ) {
      return false;
    }
    if (
      filterState.paymentIntervals.length > 0 &&
      filterState.paymentIntervals.indexOf(item.paymentInterval) < 0
    ) {
      return false;
    }

    if (
      filterState.amountRangeFrom > 0 &&
      parseInt(item.amount) < parseInt(filterState.amountRangeFrom)
    ) {
      return false;
    }

    if (
      filterState.amountRangeTo > 0 &&
      parseInt(item.amount) > parseInt(filterState.amountRangeTo)
    ) {
      return false;
    }

    if (
      filterState.dateRangeFrom &&
      moment(filterState.dateRangeFrom).isAfter(item.date)
    ) {
      return false;
    }

    if (
      filterState.dateRangeTo &&
      moment(filterState.dateRange).isBefore(item.date)
    ) {
      return false;
    }

    return true;
  }

  const sortedTransactions = useMemo(() => {
    let compare;
    switch (sortBy) {
      case sortTypes.SortBy.DATE:
        compare = isDescending ? helpers.compare.adate : helpers.compare.ddate;
        break;
      case sortTypes.SortBy.AMOUNT:
        compare = isDescending
          ? helpers.compare.aamount
          : helpers.compare.damount;
        break;
      case sortTypes.SortBy.NAME:
        compare = isDescending ? helpers.compare.aname : helpers.compare.dname;
        break;
      default:
        break;
    }
    return [...transactions].sort(compare);
  }, [transactions, isDescending, sortBy]);

  const sortButtonMap: {[index: string]: any} = {
    aamount: <Component.Buttons.AAmountSort />,
    damount: <Component.Buttons.DAmountSort />,
    aname: <Component.Buttons.ANameSort />,
    dname: <Component.Buttons.DNameSort />,
    adate: <Component.Buttons.ADateSort />,
    ddate: <Component.Buttons.DDateSort />,
  };

  function SortButton({
    sortBy,
    isDescending,
    styles,
  }: {
    sortBy: sortTypes.SortBy;
    isDescending: boolean;
    styles: any;
  }) {
    let Component;
    console.log('RUNNING');
    switch (sortBy) {
      case sortTypes.SortBy.AMOUNT:
        Component = isDescending
          ? sortButtonMap.aamount
          : sortButtonMap.damount;
        break;
      case sortTypes.SortBy.NAME:
        Component = isDescending ? sortButtonMap.aname : sortButtonMap.dname;
        break;
      case sortTypes.SortBy.DATE:
        Component = isDescending ? sortButtonMap.adate : sortButtonMap.ddate;
        break;
      default:
        Component = sortButtonMap.adate;
        break;
    }

    return React.cloneElement(Component, {
      onPress: () => dispatch(actions.sort.setIsDescending(!isDescending)),
      onLongPress: () =>
        dispatch(
          actions.modal.setVisible(modalTypes.ModalVisible.SORT_OPTIONS),
        ),
      styles,
    });
  }

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

  // clean up modals
  return (
    <>
      <Appbar.Header style={{backgroundColor: colors.primary}} dark={false}>
        <Appbar.Content title="Overview" />
        <Appbar.Action
          icon="export"
          onPress={() =>
            dispatch(actions.modal.setVisible(modalTypes.ModalVisible.EXPORT))
          }
        />
        <Appbar.Action
          icon="filter-variant"
          onPress={() =>
            dispatch(actions.modal.setVisible(modalTypes.ModalVisible.FILTER))
          }
        />
        <Appbar.Action
          icon="plus"
          onPress={() =>
            dispatch(actions.modal.setVisible(modalTypes.ModalVisible.ADD))
          }
        />
      </Appbar.Header>
      <ScrollView style={{flex: 1, backgroundColor: Colors.grey100}}>
        {/* <SortButton
          sortBy={sortBy}
          isDescending={isDescending}
          styles={homeStyles}
        /> */}

        <View>
          {status === appTypes.Status.SUCCESS &&
          transactions &&
          transactions.length === 0 ? (
            <View style={homeStyles.container}>
              <Text style={homeStyles.p}>
                Looks like you have no transactions...
              </Text>
              <Text style={homeStyles.p}>Go buy something!</Text>
              <View style={homeStyles.bagIcon}>
                <FontAwesome5Icon
                  name="shopping-bag"
                  size={50}
                  color={colors.secondary}
                />
              </View>
            </View>
          ) : (
            <View style={{paddingTop: 100}}>
              <Component.Gradient.Rectangle>
                <Card
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomEndRadius: 16,
                    borderBottomStartRadius: 16,
                    borderTopEndRadius: 16,
                    borderTopStartRadius: 16,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginHorizontal: 10,
                    marginBottom: 13,
                    marginTop: 26,
                  }}
                  elevation={0}>
                  <Card.Title
                    title="At a glance"
                    titleStyle={{
                      color: colors.secondaryHighlight,
                      fontSize: 40,
                      fontWeight: '300',
                      marginBottom: 10,
                      paddingVertical: 10,
                    }}
                  />
                  <Card.Content
                    style={{
                      paddingHorizontal: 16,
                    }}>
                    <View
                      style={{
                        marginBottom: 20,
                      }}>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 22,
                          fontWeight: '200',
                        }}>
                        Total expense
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 28,
                          fontWeight: '200',
                        }}>
                        {symbol}
                        {total.toLocaleString()}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 22,
                          fontWeight: '200',
                        }}>
                        This month
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 26,
                          fontWeight: '200',
                        }}>
                        {symbol}
                        {totalMonth.toLocaleString()}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              </Component.Gradient.Rectangle>
              <View
                style={{
                  marginHorizontal: 20,
                }}>
                <Card
                  style={{
                    marginVertical: 20,
                    paddingBottom: 16,
                  }}>
                  <Card.Title
                    title="Recent"
                    style={{
                      backgroundColor: colors.background,
                    }}
                    titleStyle={{
                      color: colors.title,
                      marginLeft: 5,
                      fontSize: 22,
                      fontWeight: '300',
                    }}
                    rightStyle={{marginTop: 3}}
                    right={() => (
                      <Card.Actions>
                        <Button
                          labelStyle={{
                            color: colors.text,
                            fontSize: 11,
                          }}
                          onPress={() =>
                            navigation.navigate('TransactionsScreen')
                          }>
                          VIEW ALL
                        </Button>
                      </Card.Actions>
                    )}
                  />
                  <Component.Transactions limit={3} />
                </Card>
                <Card style={{paddingBottom: 16, marginBottom: 30}}>
                  <Card.Title
                    title="By payment method"
                    style={{
                      backgroundColor: colors.background,
                    }}
                    titleStyle={{
                      color: colors.title,
                      marginLeft: 5,
                      fontSize: 22,
                      fontWeight: '300',
                    }}
                    right={() => (
                      <Card.Actions>
                        <Button
                          labelStyle={{
                            color: colors.text,
                            fontSize: 11,
                          }}
                          onPress={() =>
                            navigation.navigate('TransactionsScreen')
                          }>
                          VIEW ALL
                        </Button>
                      </Card.Actions>
                    )}
                  />
                  <Component.Category
                    title="Cash"
                    paymentMethod={transactionTypes.PaymentMethod.CASH}
                    icon="cash"
                  />
                  <Component.Category
                    title="Credit"
                    paymentMethod={transactionTypes.PaymentMethod.CREDIT}
                    icon="credit-card-outline"
                  />
                  <Component.Category
                    title="Debit"
                    paymentMethod={transactionTypes.PaymentMethod.DEBIT}
                    icon="bank-outline"
                  />
                  <Component.Category
                    title="Check"
                    paymentMethod={transactionTypes.PaymentMethod.CHECK}
                    icon="checkbook"
                  />
                  <Component.Category
                    title="Other"
                    paymentMethod={transactionTypes.PaymentMethod.OTHER}
                    icon="hand-coin-outline"
                  />
                </Card>
              </View>
            </View>
          )}
          <Component.NewTransaction />
          <Component.Filter data={transactions} />
          <Component.Export />
          <Component.SortOptions />
        </View>
      </ScrollView>
      <Component.Search />
    </>
  );
}
