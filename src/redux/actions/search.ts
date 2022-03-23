import {constants} from '..';
import {searchTypes} from '../../types';

export function focus() {
  return {type: constants.search.FOCUS};
}

export function blur() {
  return {type: constants.search.BLUR};
}

export function update(search: Partial<searchTypes.State>) {
  return {type: constants.search.UPDATE, ...search};
}

export function clear() {
  return {type: constants.search.CLEAR};
}
