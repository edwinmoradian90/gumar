import {appTypes, spreadSheetTypes} from '../../types';
import {
  SPREAD_SHEET,
  SPREAD_SHEET_FAILURE,
  SPREAD_SHEET_SUCCESS,
} from '../constants/spreadSheets';

const spreadSheetsInitialState: spreadSheetTypes.InitialState = {
  sheets: [],
  status: appTypes.Status.SUCCESS,
};

export default function spreadSheetsReducer(
  state = spreadSheetsInitialState,
  action: any,
) {
  const {
    type,
    sheets,
  }: {type: string; sheets: spreadSheetTypes.SpreadSheet[] | []} = action || {};
  switch (type) {
    case SPREAD_SHEET:
      return {
        ...state,
        status: appTypes.Status.LOADING,
      };
    case SPREAD_SHEET_SUCCESS:
      return {
        ...state,
        sheets,
        status: appTypes.Status.SUCCESS,
      };
    case SPREAD_SHEET_FAILURE:
      return {
        ...state,
        status: appTypes.Status.ERROR,
      };
    default:
      return state;
  }
}
