import {combineReducers} from 'redux';
import {
  account,
  alert,
  app,
  currency,
  filter,
  home,
  modal,
  search,
  settings,
  snackbar,
  sort,
  spreadSheets,
  transaction,
} from '.';

const root = combineReducers({
  account,
  alert,
  app,
  currency,
  filter,
  home,
  modal,
  search,
  settings,
  snackbar,
  sort,
  spreadSheets,
  transaction,
});
export default root;
