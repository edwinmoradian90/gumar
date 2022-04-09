import React from 'react';
import * as Component from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Appbar, Divider, Headline, Paragraph} from 'react-native-paper';
import {colors} from '../../utils';
import {ScrollView, View} from 'react-native';

export default function Subscriptions() {
  const navigation = useNavigation();
  const route = useRoute<any>();

  console.log(route.name);

  return (
    <React.Fragment>
      <Appbar.Header
        style={{backgroundColor: colors.white, elevation: 0}}
        dark={false}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Subscriptions" />
      </Appbar.Header>
      <View style={{marginHorizontal: 20}}>
        <Headline>Manage subscriptions</Headline>
        <Paragraph style={{color: colors.text}}>
          Subscriptions are added and calculated to your transactions
          automatically based on your installment plan. Update, freeze, and
          remove your subscriptions here.
        </Paragraph>
        <Divider style={{marginTop: 20}} />
        <ScrollView>
          <Component.Subscriptions />
        </ScrollView>
      </View>
    </React.Fragment>
  );
}
