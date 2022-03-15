import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Text, Appbar, Headline, Surface, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {
  VictoryArea,
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
} from 'victory-native';
import {storeTypes, transactionTypes} from '../types';
import {helpers} from '../utils';
import {primary, secondary} from '../utils/colors';

export default function Stats() {
  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const navigation = useNavigation();

  const transactionAmounts = useMemo(() => {
    return (
      transactions.length > 0 &&
      transactions
        .sort(helpers.compare.ddate)
        .map((transaction: transactionTypes.Transaction, index: number) => {
          return {
            number: index + 1,
            amount: parseInt(transaction.amount),
          };
        })
    );
  }, [transactions]);

  const transactionPaymentMethods = useMemo(() => {
    // fix types
    const result: any = [];
    const paymentMethodMap: any = {};
    transactions.length > 0 &&
      transactions.forEach(
        (transaction: transactionTypes.Transaction, index: number) => {
          if (paymentMethodMap[transaction.paymentMethod]) {
            paymentMethodMap[transaction.paymentMethod] += 1;
          } else {
            paymentMethodMap[transaction.paymentMethod] = 1;
          }
        },
      );

    Object.keys(paymentMethodMap).forEach((key: string) =>
      result.push({x: helpers.capitalize(key), y: paymentMethodMap[key]}),
    );

    return result;
  }, [transactions]);

  console.log(transactionPaymentMethods);

  return (
    <>
      <Appbar.Header style={{backgroundColor: primary}}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Stats" />
      </Appbar.Header>
      <ScrollView style={{backgroundColor: primary}}>
        <Headline style={styles.headline}>Recent spending habits</Headline>
        {transactions.length > 0 ? (
          <View>
            <Card>
              <Title style={styles.title}>At a glance</Title>
              <View style={styles.container}>
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryArea
                    style={{data: {fill: secondary}}}
                    interpolation="natural"
                    animate={{duration: 200}}
                    data={transactionAmounts}
                    x="number"
                    y="amount"
                  />
                </VictoryChart>
              </View>
            </Card>
            <Card>
              <Title style={styles.title}> Payment method usage</Title>
              <View style={styles.container}>
                <VictoryPie data={transactionPaymentMethods} />
              </View>
            </Card>
          </View>
        ) : (
          <Headline>Need some transactions</Headline>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  headline: {
    padding: 20,
  },
  title: {
    padding: 20,
  },
});
