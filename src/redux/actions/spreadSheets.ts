import moment from 'moment';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import config from '../../settings/config';
import {spreadSheetTypes, storeTypes, transactionTypes} from '../../types';
import {
  SPREAD_SHEET,
  SPREAD_SHEET_FAILURE,
  SPREAD_SHEET_SUCCESS,
} from '../constants/spreadSheets';

async function setSheetValues(
  accessToken: string,
  spreadSheetId: string,
  transactions: transactionTypes.Transaction[],
) {
  console.log(transactions);
  const batchUpdateUrl = `${config.sheets.url}/${spreadSheetId}/values:batchUpdate`;
  const range = `A1:D${transactions.length + 1}`;
  const categories = ['Name', 'Amount', 'Date', 'Time'];
  const transactionValues = transactions.map(
    (transaction: transactionTypes.Transaction) => {
      const date = moment(transaction.date).format('MMMM DD YYYY');
      const time = moment(transaction.date).format('hh:mm A');
      return [transaction.name, transaction.amount, date, time];
    },
  );
  const values = [categories, ...transactionValues];
  const body = {
    data: [
      {
        range,
        values,
      },
    ],
    valueInputOption: 'RAW',
    includeValuesInResponse: true,
  };
  const data = await fetch(batchUpdateUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await data.json();
}

export function create(
  accessToken: string,
  spreadSheet: Omit<spreadSheetTypes.SpreadSheet, 'id'>,
  transactions: transactionTypes.Transaction[],
): ThunkAction<void, storeTypes.RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const {sheets: currentSheets} = getState().spreadSheets;
    const URL = 'https://sheets.googleapis.com/v4/spreadsheets';

    try {
      dispatch({type: SPREAD_SHEET});
      const body = {
        properties: {
          title: spreadSheet.title,
        },
      };
      console.log('TRY');
      const data = await fetch(URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const {spreadsheetId: id} = await data.json();
      const newSpreadSheetWithId = {...spreadSheet, id};
      const sheets = [...currentSheets, newSpreadSheetWithId];

      await setSheetValues(accessToken, id, transactions);

      dispatch({
        type: SPREAD_SHEET_SUCCESS,
        sheets,
      });
    } catch (error) {
      console.error(error);
      dispatch({type: SPREAD_SHEET_FAILURE});
    }
  };
}

// add removal in google sheets as well
export function clear(): ThunkAction<
  void,
  storeTypes.RootState,
  unknown,
  AnyAction
> {
  return async dispatch => {
    try {
      dispatch({type: SPREAD_SHEET});
      // code for removing from google drive
      dispatch({type: SPREAD_SHEET_SUCCESS, sheets: []});
      console.log('CLEARED SHEETS');
    } catch (error) {
      console.error(error);
      dispatch({type: SPREAD_SHEET_FAILURE});
    }
  };
}
