import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Appbar, Colors, Divider} from 'react-native-paper';
import * as Component from '../components';
import {appTypes, modalTypes} from '../types';
import {colors, helpers} from '../utils';

export default function Transactions() {
  const route = useRoute<any>();
  const navigation = useNavigation();

  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const category = route.params?.category;
  const isSearchResult =
    route.params?.navigationInitiator === appTypes.NavigationInitiator.SEARCH;

  function handleBack() {
    navigation.goBack();
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
          onPress={() => setShowNewTransaction(true)}
        />
      </Appbar.Header>
      <Component.Toolbar
        startSpace={90}
        title={category && helpers.capitalize(category)}
        isExportVisible={showExport}
        setIsExportVisible={setShowExport}
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
      <Component.NewTransaction
        isVisible={showNewTransaction}
        setIsVisible={setShowNewTransaction}
      />
      <Component.Export isVisible={showExport} setIsVisible={setShowExport} />
      <Component.Filter isVisible={showFilter} setIsVisible={setShowFilter} />
      <Component.Search
        containerBackgroundColor={colors.white}
        searchBackgroundColor={colors.altBackground}
      />
    </React.Fragment>
  );
}
