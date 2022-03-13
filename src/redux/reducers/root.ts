import {combineReducers} from 'redux';
import {
  account,
  app,
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
  filter,
  home,
  modal,
  settings,
  sort,
  spreadSheets,
  transaction,
});
export default root;
