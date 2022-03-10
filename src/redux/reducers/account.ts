import {
  GOOGLE_AUTH,
  GOOGLE_AUTH_FAILURE,
  GOOGLE_AUTH_SUCCESS,
} from '../constants/account';
import {accountTypes, appTypes} from '../../types';

const accountInitialState: accountTypes.InitialState = {
  id: '',
  givenName: '',
  email: '',
  idToken: '',
  accessToken: '',
  photo: '',
  error: null,
  isLoggedIn: false,
  status: appTypes.Status.SUCCESS,
};

export default function accountReducer(
  state = accountInitialState,
  action: any,
) {
  const {
    type,
    id,
    givenName,
    email,
    idToken,
    accessToken,
    photo,
    error,
    isLoggedIn,
  } = action || {};
  switch (type) {
    case GOOGLE_AUTH:
      return {
        ...state,
        status: appTypes.Status.LOADING,
      };
    case GOOGLE_AUTH_SUCCESS:
      console.log('ACCESS ', accessToken);
      return {
        ...state,
        id: id || state.id,
        idToken: idToken || state.idToken,
        accessToken: accessToken || state.accessToken,
        givenName: givenName || state.givenName,
        email: email || state.email,
        photo: photo || state.photo,
        isLoggedIn,
        status: appTypes.Status.SUCCESS,
      };
    case GOOGLE_AUTH_FAILURE:
      return {
        ...state,
        error: error || state.error,
        isLoggedIn,
        status: appTypes.Status.ERROR,
      };
    default:
      return state;
  }
}
