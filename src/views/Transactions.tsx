import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {Appbar, Colors} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as Component from '../components';
import {actions} from '../redux';
import {appTypes, modalTypes, storeTypes} from '../types';
import {colors} from '../utils';

export default function Transactions() {
  const dispatch = useDispatch();
  const route = useRoute<appTypes.TransactionsScreenProp>();
  const navigation = useNavigation();
  const {paymentMethods} = useSelector(
    (state: storeTypes.RootState) => state.filter,
  );

  function handleAdd() {
    dispatch(actions.modal.setVisible(modalTypes.ModalVisible.ADD));
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
        />
        <Appbar.Action
          icon="export"
          color={colors.iconButtonColor}
          onPress={() =>
            dispatch(actions.modal.setVisible(modalTypes.ModalVisible.EXPORT))
          }
        />
        <Appbar.Action
          icon="filter-variant"
          color={colors.iconButtonColor}
          onPress={() =>
            dispatch(actions.modal.setVisible(modalTypes.ModalVisible.FILTER))
          }
        />
        <Appbar.Action
          icon="plus"
          color={colors.iconButtonColor}
          onPress={handleAdd}
        />
      </Appbar.Header>
      <ScrollView>
        <Component.Transactions paymentMethod={route.params?.paymentMethod} />
      </ScrollView>
    </React.Fragment>
  );
}
