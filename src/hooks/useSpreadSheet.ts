import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {
  appTypes,
  spreadSheetTypes,
  storeTypes,
  transactionTypes,
} from '../types';
import {helpers} from '../utils';

export default function useSpreadSheet(): any {
  const dispatch = useDispatch();
  const spreadsheets = useSelector(
    (state: storeTypes.RootState) => state.spreadSheets,
  );

  const statuses = useMemo(() => {
    const statuses: {[index: string]: boolean} = {};
    Object.keys(appTypes.Status).forEach((key: string) => {
      const value = appTypes.Status[key as keyof typeof appTypes.Status];
      return (statuses[`is${helpers.capitalize(value)}Status`] =
        spreadsheets.status === value);
    });
    return statuses;
  }, [spreadsheets.status]);

  function create(
    accessToken: string,
    spreadSheet: Omit<spreadSheetTypes.SpreadSheet, 'id'>,
    transactions: transactionTypes.Transaction[],
  ) {
    dispatch(
      actions.spreadSheet.create(accessToken, spreadSheet, transactions),
    );
  }

  function clear() {
    dispatch(actions.spreadSheet.clear());
  }

  return {
    create,
    clear,
    currentStatus: spreadsheets.status,
    ...statuses,
  };
}
