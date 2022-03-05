import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {primary, secondary} from '../utils/colors';

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
    color: secondary,
    fontSize: 32,
    fontWeight: 'bold',
  },
});
