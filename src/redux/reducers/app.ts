import {constants} from '..';
import {appTypes} from '../../types';

const appInitialState = {
  mode: appTypes.Mode.DEFAULT,
  editTarget: appTypes.EditTarget.NONE,
  status: appTypes.Status.SUCCESS,
};

export default function appReducer(state = appInitialState, action: any) {
  const {editTarget, mode, status, type} = action || {};
  switch (type) {
    case constants.app.SET_MODE:
      return {
        ...state,
        mode,
      };
    case constants.app.SET_EDIT_TARGET:
      return {
        ...state,
        editTarget,
      };
    case constants.app.SET_STATUS:
      return {
        ...state,
        status,
      };
    default:
      return state;
  }
}
