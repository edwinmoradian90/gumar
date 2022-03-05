import homeReducer from './home';
import transactionReducer from './transaction';
import modalReducer from './modal';
import {combineReducers} from 'redux';
import settingsReducer from './settings';
import accountReducer from './account';
import spreadSheetsReducer from './spreadSheets';

const root = combineReducers({
  home: homeReducer,
  transaction: transactionReducer,
  modal: modalReducer,
  settings: settingsReducer,
  account: accountReducer,
  spreadSheets: spreadSheetsReducer,
});
export default root;
