import {constants} from '..';
import {alertTypes} from '../../types';

const initialState: alertTypes.State = {
  title: '',
  body: '',
  confirm: '',
  deny: '',
  visible: false,
  onDismiss: () => {},
  onConfirm: () => {},
  onDeny: () => {},
};

export default function menuReducer(state = initialState, action: any) {
  const {alert, type} = action || {};
  switch (type) {
    case constants.alert.SET_VISIBLE:
      return {
        ...state,
        ...alert,
        visible: true,
      };
    case constants.alert.SET_NOT_VISIBLE:
      return initialState;
    default:
      return state;
  }
}
