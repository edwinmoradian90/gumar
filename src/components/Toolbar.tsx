import React, {useState} from 'react';
import * as Component from '../components';
import {View} from 'react-native';
import {Appbar, Menu} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useFilter, useMode, useSelect, useSort} from '../hooks';
import {actions} from '../redux';
import {
  alertTypes,
  appTypes,
  selectTypes,
  snackbarTypes,
  sortTypes,
} from '../types';
import {colors} from '../utils';

export default function Toolbar({
  title = 'All',
  startSpace = 0,
}: {
  title?: string;
  startSpace?: number;
}) {
  const {setMode, isSelectMode} = useMode();
  const {selectionObject} = useSelect();
  const dispatch = useDispatch();
  const sort = useSort();
  const filter = useFilter();

  const [allSelected, setAllSelected] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  function handleSelectModePress() {
    const mode = !isSelectMode ? appTypes.Mode.SELECT : appTypes.Mode.DEFAULT;
    if (isSelectMode) {
      selectionObject.setAll('transactions', selectTypes.Status.UNCHECKED);
      if (allSelected) setAllSelected(false);
    }
    setMode(mode);
  }

  function selectModeLongPress() {
    if (!isSelectMode) return null;
    const value = allSelected
      ? selectTypes.Status.UNCHECKED
      : selectTypes.Status.CHECKED;
    selectionObject.setAll('transactions', value);
    setAllSelected(!allSelected);
  }

  function removeMultipleTransactions() {
    const transactionSelection = selectionObject.get('transactions');
    const selectedIds: string[] = selectionObject.filter(
      transactionSelection,
      selectTypes.Status.CHECKED,
    );

    const snackbarDismiss = () => dispatch(actions.snackbar.setNotVisible());

    const snackbar: Partial<snackbarTypes.State> = {
      message: 'Transactions removed.',
      onDismiss: snackbarDismiss,
      actionOnpress: snackbarDismiss,
      actionLabel: 'Dismiss',
    };

    const alertDismiss = () => dispatch(actions.alert.setNotVisible());
    const alertConfirm = () => {
      if (allSelected) setAllSelected(false);
      selectionObject.setAll('transactions', selectTypes.Status.UNCHECKED);
      alertDismiss();
      dispatch(actions.transaction.removeMany(selectedIds));
      setMode(appTypes.Mode.DEFAULT);
      dispatch(actions.snackbar.setVisible(snackbar));
    };

    const alert: Partial<alertTypes.State> = {
      title: 'Are you sure?',
      body: 'This action is irreversible. Remove transactions?',
      confirm: 'Delete',
      deny: 'Cancel',
      onDismiss: alertDismiss,
      onDeny: alertDismiss,
      onConfirm: alertConfirm,
    };

    dispatch(actions.alert.setVisible(alert));
  }

  function handleMenuItemSelect(sortBy: sortTypes.SortBy) {
    sort.set(sortBy, sort.isDescending);
    setShowSortMenu(false);
  }

  const deleteDisabled = isSelectMode
    ? !selectionObject.hasAnySelected(
        'transactions',
        selectTypes.Status.CHECKED,
      )
    : true;

  return (
    <Appbar.Header
      style={{
        marginTop: startSpace,
        paddingBottom: 10,
        backgroundColor: colors.background,
        elevation: 1,
        height: 40,
        justifyContent: 'flex-end',
      }}>
      <Appbar.Content
        titleStyle={{color: colors.title, fontSize: 16, marginLeft: 10}}
        title={title}
      />
      <View
        style={{
          borderRightColor: colors.muted,
          marginHorizontal: 5,
          borderRightWidth: 1,
        }}>
        <Appbar.Action
          color={isSelectMode ? colors.secondary : colors.iconButtonColor}
          size={22}
          icon="checkbox-marked-outline"
          onPress={handleSelectModePress}
          onLongPress={selectModeLongPress}
        />
      </View>
      <Appbar.Action size={22} icon="export" />
      <Component.AppbarActions.FilterButton />
      <Menu
        visible={showSortMenu}
        anchor={
          <Appbar.Action
            icon={sort.iconName}
            color={colors.iconButtonColor}
            size={22}
            onPress={() => sort.set(sort.by, !sort.isDescending)}
            onLongPress={() => setShowSortMenu(true)}
          />
        }
        onDismiss={() => setShowSortMenu(false)}>
        <Menu.Item
          title="Name"
          icon="sort-alphabetical-variant"
          onPress={() => handleMenuItemSelect(sortTypes.SortBy.NAME)}
        />
        <Menu.Item
          title="Amount"
          icon="sort-numeric-variant"
          onPress={() => handleMenuItemSelect(sortTypes.SortBy.AMOUNT)}
        />
        <Menu.Item
          title="Date"
          icon="calendar-range-outline"
          onPress={() => handleMenuItemSelect(sortTypes.SortBy.DATE)}
        />
      </Menu>
      <Appbar.Action
        size={22}
        icon="trash-can-outline"
        disabled={deleteDisabled}
        onPress={removeMultipleTransactions}
      />
    </Appbar.Header>
  );
}
