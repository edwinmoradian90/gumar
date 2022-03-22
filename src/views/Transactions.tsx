import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {Appbar, Colors} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as Component from '../components';
import {actions} from '../redux';
import {appTypes, modalTypes, snackbarTypes, storeTypes} from '../types';
import {colors, helpers} from '../utils';

export default function Transactions() {
  const dispatch = useDispatch();
  const route = useRoute<appTypes.TransactionsScreenProp>();
  const navigation = useNavigation();

  const {isUsingFilter} = useSelector(
    (state: storeTypes.RootState) => state.filter,
  );

  const paymentMethod = route.params?.paymentMethod;

  function handleAdd() {
    dispatch(actions.modal.setVisible(modalTypes.ModalVisible.ADD));
  }

  function handleFilterLongPress() {
    if (!isUsingFilter) return null;

    const onDismiss = () => dispatch(actions.snackbar.setNotVisible());

    const snackbar: Partial<snackbarTypes.State> = {
      message: 'Filter removed.',
      actionLabel: 'Dismiss',
      actionOnpress: onDismiss,
      onDismiss,
    };

    dispatch(actions.filter.clear());
    dispatch(actions.snackbar.setVisible(snackbar));
  }

  return (
    <React.Fragment>
      <Appbar.Header
        style={{backgroundColor: Colors.white, elevation: 0}}
        dark={false}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{color: colors.title}}
          title="Transactions"
          subtitle={paymentMethod && helpers.capitalize(paymentMethod)}
          subtitleStyle={{color: colors.muted, fontSize: 14}}
        />
        <Appbar.Action
          style={{
            borderRadius: 5,
          }}
          icon="export"
          color={colors.iconButtonColor}
          onPress={() =>
            dispatch(actions.modal.setVisible(modalTypes.ModalVisible.EXPORT))
          }
        />
        <Appbar.Action
          style={{
            backgroundColor: isUsingFilter
              ? colors.secondary
              : colors.background,
            borderRadius: 5,
          }}
          icon="filter-variant"
          color={isUsingFilter ? colors.white : colors.iconButtonColor}
          onPress={() =>
            dispatch(actions.modal.setVisible(modalTypes.ModalVisible.FILTER))
          }
          onLongPress={handleFilterLongPress}
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
      <ScrollView>
        <Component.Transactions paymentMethod={paymentMethod} />
      </ScrollView>
    </React.Fragment>
  );
}
