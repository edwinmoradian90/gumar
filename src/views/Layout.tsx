import React, {useEffect, useMemo} from 'react';
import * as Component from '../components';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {storeTypes, transactionTypes} from '../types';
import {colors, _} from '../utils';
import {useSnackbar, useTransactions, useTransactionsFilter} from '../hooks';

export default function Layout({
  children,
}: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) {
  const sb = useSnackbar();
  const snackbar = useSelector((state: storeTypes.RootState) => state.snackbar);
  const alert = useSelector((state: storeTypes.RootState) => state.alert);
  const {createManualFilter} = useTransactionsFilter();

  const manualFilter = createManualFilter(
    (transaction: transactionTypes.Transaction) =>
      transaction.installment !== transactionTypes.Installment.SINGLE,
  );

  const transactions = useTransactions({ignoreFilter: true, manualFilter});

  const recentSubscriptions = useMemo(() => {
    const subscriptions = _.transactions.getSubscriptions(
      transactions.modified,
    );
    if (subscriptions.length === 0) return {};
    const recentSubscriptions =
      _.transactions.recentSubscriptionMap(subscriptions);

    return recentSubscriptions;
  }, [transactions.modified]);

  useEffect(() => {
    const subCheck = setInterval(() => {
      let updateCount = 0;
      Object.values(recentSubscriptions).forEach(
        (subscription: transactionTypes.Transaction) => {
          if (!_.transactions.shouldAutoPopulate(subscription)) return;
          updateCount++;
          transactions.autoCreateSubscriptionTransaction(subscription);
        },
      );

      if (updateCount > 0) {
        const snackbarData = sb.create(
          `Automatically updated ${updateCount} ${
            updateCount === 1 ? 'subscription' : 'subscriptions'
          }`,
        );
        sb.show(snackbarData);
      }
    }, 60 * 1000);
    return () => clearInterval(subCheck);
  }, [transactions.modified]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      {children}
      <Component.NewTransaction />
      <Component.Export />
      <Component.SortOptions />
      {/* <Component.Filter data={transactions.all} /> */}
      <Snackbar
        duration={5000}
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
  },
});
