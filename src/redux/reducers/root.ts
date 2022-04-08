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
  select,
  settings,
  snackbar,
  sort,
  spreadSheets,
  subscriptions,
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
  select,
  settings,
  snackbar,
  sort,
  spreadSheets,
  subscriptions,
  transaction,
});
export default root;
