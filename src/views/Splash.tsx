import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils';

export default function Splash() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Price Tracker</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    color: colors.secondary,
    fontSize: 32,
    fontWeight: 'bold',
  },
});
