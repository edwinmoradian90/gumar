import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {Appbar, Colors, Divider} from 'react-native-paper';
import * as Component from '../components';
import {useModal} from '../hooks';
import {appTypes, modalTypes} from '../types';
import {colors, helpers} from '../utils';

export default function Transactions() {
  const route = useRoute<appTypes.TransactionsScreenProp>();
  const navigation = useNavigation();
  const modal = useModal();

  const category = route.params?.category;
  const isSearchResult =
    route.params?.navigationInitiator === appTypes.NavigationInitiator.SEARCH;

  function handleBack() {
    navigation.goBack();
  }

  function handleAdd() {
    modal.show(modalTypes.ModalVisible.ADD);
  }

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
        title={category && helpers.capitalize(category)}
      />
      <Divider />
      <ScrollView>
        <Component.Transactions
          category={category}
          startSpace={0}
          isSearchResult={isSearchResult}
          hasSelectMode={true}
        />
      </ScrollView>
      <Component.Search
        containerBackgroundColor={colors.white}
        searchBackgroundColor={colors.altBackground}
      />
    </React.Fragment>
  );
}
