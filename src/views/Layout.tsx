import React from 'react';
import * as Component from '../components';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {storeTypes} from '../types';
import {colors} from '../utils';

export default function Layout({
  children,
}: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) {
  const snackbar = useSelector((state: storeTypes.RootState) => state.snackbar);
  const alert = useSelector((state: storeTypes.RootState) => state.alert);
  console.log(alert.visible, snackbar.visible);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      {children}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={snackbar.onDismiss}
        action={{
          label: snackbar?.actionLabel,
          onPress: snackbar?.actionOnpress,
        }}>
        {snackbar.message}
      </Snackbar>
      <Component.Alert
        visible={alert.visible}
        title={alert.title}
        body={alert.body}
        confirm={alert.confirm}
        deny={alert.deny}
        onConfirm={alert.onConfirm}
        onDeny={alert.onDeny}
        onDismiss={alert.onDismiss}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
  },
});
