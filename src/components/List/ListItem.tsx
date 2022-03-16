import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, helpers} from '../../utils';

export default function ListItem({
  currency,
  listItemData,
  onPress,
}: {
  currency: string;
  listItemData?: any;
  onPress: (item: any) => void;
}) {
  const {amount, date, name} = listItemData || {};
  return (
    <Pressable style={styles.container} onPress={() => onPress(listItemData)}>
      <View style={styles.nameDateWrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{helpers.humanReadableDate(date)}</Text>
      </View>
      <View style={styles.currencyContainer}>
        <Text style={styles.amount}>{currency}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    width: '100%',
  },
  currencyContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {},
  date: {},
  amount: {},
  nameDateWrapper: {},
});
