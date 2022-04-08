import {useCallback} from 'react';
import {transactionTypes} from '../types';

export default function useTransactionsFilter() {
  const createManualFilter = useCallback(
    (fn: (transaction: transactionTypes.Transaction) => boolean) => {
      return fn;
    },
    [],
  );

  return {createManualFilter};
}
