import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {primary, secondary} from '../utils/colors';

export default function Layout({
  children,
}: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
