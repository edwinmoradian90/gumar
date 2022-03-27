import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {Appbar, Colors, Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as Component from '../components';
import {useMode} from '../hooks';
import {actions} from '../redux';
import {appTypes, modalTypes, snackbarTypes, storeTypes} from '../types';
import {colors, helpers} from '../utils';

export default function Transactions() {
  const dispatch = useDispatch();
  const route = useRoute<appTypes.TransactionsScreenProp>();
  const navigation = useNavigation();
  const {isSelectMode} = useMode();

  const {isUsingFilter} = useSelector(
    (state: storeTypes.RootState) => state.filter,
  );

  const paymentMethod = route.params?.paymentMethod;
  const isSearchResult =
    route.params?.navigationInitiator === appTypes.NavigationInitiator.SEARCH;

  function handleBack() {
    navigation.goBack();
  }

  function handleAdd() {
    dispatch(actions.modal.setVisible(modalTypes.ModalVisible.ADD));
  }

  // function handleFilterLongPress() {
  //   if (!isUsingFilter) return null;

  //   const onDismiss = () => dispatch(actions.snackbar.setNotVisible());

  //   const snackbar: Partial<snackbarTypes.State> = {
  //     message: 'Filter removed.',
  //     actionLabel: 'Dismiss',
  //     actionOnpress: onDismiss,
  //     onDismiss,
  //   };

  //   dispatch(actions.filter.clear());
  //   dispatch(actions.snackbar.setVisible(snackbar));
  // }

  return (
    <React.Fragment>
      <Appbar.Header
        style={{backgroundColor: Colors.white, elevation: 0}}
        dark={false}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content
          titleStyle={{color: colors.title}}
          title={isSearchResult ? 'Search results' : 'Transactions'}
        />
        <Appbar.Action
          style={{
            borderRadius: 5,
          }}
          icon="plus"
          color={colors.iconButtonColor}
          onPress={handleAdd}
        />
      </Appbar.Header>
      <Component.Toolbar
        startSpace={90}
        title={paymentMethod && helpers.capitalize(paymentMethod)}
      />
      <Divider />
      <ScrollView>
        <Component.Transactions
          paymentMethod={paymentMethod}
          startSpace={0}
          isSearchResult={isSearchResult}
        />
      </ScrollView>
      <Component.Search
        containerBackgroundColor={colors.white}
        searchBackgroundColor={colors.altBackground}
      />
    </React.Fragment>
  );
}
