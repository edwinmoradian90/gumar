import {combineReducers} from 'redux';
import {
  account,
  app,
  currency,
  filter,
  home,
  modal,
  settings,
  sort,
  spreadSheets,
  transaction,
} from '.';

const root = combineReducers({
  account,
  app,
  currency,
  filter,
  home,
  modal,
  settings,
  sort,
  spreadSheets,
  transaction,
});
export default root;
