import {Status} from '../../types/app';
import {
  SPREAD_SHEET,
  SPREAD_SHEET_FAILURE,
  SPREAD_SHEET_SUCCESS,
} from '../constants/spreadSheets';
import {SpreadSheetProps} from '../types/spreadSheets';

interface SpreadSheetsInitialStateProps {
  sheets: SpreadSheetProps[] | [];
  status: Status;
}

const spreadSheetsInitialState: SpreadSheetsInitialStateProps = {
  sheets: [],
  status: Status.SUCCESS,
};

export default function spreadSheetsReducer(
  state = spreadSheetsInitialState,
  action: any,
) {
  const {type, sheets}: {type: string; sheets: SpreadSheetProps[] | []} =
    action || {};
  switch (type) {
    case SPREAD_SHEET:
      return {
        ...state,
        status: Status.LOADING,
      };
    case SPREAD_SHEET_SUCCESS:
      return {
        ...state,
        sheets,
        status: Status.SUCCESS,
      };
    case SPREAD_SHEET_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
      };
    default:
      return state;
  }
}
