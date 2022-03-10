import {combineReducers} from 'redux';
import {
  account,
  app,
  home,
  modal,
  settings,
  spreadSheets,
  transaction,
} from '.';

const root = combineReducers({
  home,
  transaction,
  modal,
  settings,
  account,
  spreadSheets,
});
export default root;
