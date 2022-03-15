import moment from 'moment';
import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, ScrollView, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import * as Component from '../components';
import {actions} from '../redux';
import {currencies} from '../data/currency';
import homeStyles from '../styles/home';
import {
  appTypes,
  transactionTypes,
  storeTypes,
  modalTypes,
  sortTypes,
} from '../types';
import {colors, helpers} from '../utils';

export default function Home() {
  const navigation = useNavigation<appTypes.Navigation>();
  const dispatch = useDispatch();
  const {transactions, status} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const {currency} = useSelector(
    (state: storeTypes.RootState) => state.settings,
  );
  const currencySymbol: any = useMemo(() => {
    let symbol;
    currencies.forEach((c: {[index: string]: string}) =>
      c.id === currency ? (symbol = c.symbol) : null,
    );
    return symbol;
  }, [currency]);

  const filterState = useSelector(
    (state: storeTypes.RootState) => state.filter,
  );
  const {sortBy, isDescending} = useSelector(
    (state: storeTypes.RootState) => state.sort,
  );

  function onPress(transaction: transactionTypes.Transaction) {
    dispatch(actions.transaction.select(transaction));
    navigation.navigate('EditScreen');
  }

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

  // clean up modals
  return (
    <>
      <Component.Header
        title="Overview"
        left={['title']}
        right={['export', 'filter', 'add']}
      />
      <ScrollView style={{flex: 1, backgroundColor: colors.primary}}>
        <SortButton
          sortBy={sortBy}
          isDescending={isDescending}
          styles={homeStyles}
        />

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
            <Component.IList data={sortedTransactions} filter={filter}>
              <Component.ListItem currency={currencySymbol} onPress={onPress} />
            </Component.IList>
          )}
          <Component.NewTransaction />
          <Component.Filter data={transactions} />
          <Component.Export />
          <Component.SortOptions />
        </View>
      </ScrollView>
    </>
  );
}
