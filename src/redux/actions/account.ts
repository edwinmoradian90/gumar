import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {storeTypes} from '../../types';
import {
  GOOGLE_AUTH,
  GOOGLE_AUTH_FAILURE,
  GOOGLE_AUTH_SUCCESS,
} from '../constants/account';

export function login(): ThunkAction<
  void,
  storeTypes.RootState,
  any,
  AnyAction
> {
  return async (dispatch, getState) => {
    const {isLoggedIn} = getState().account;
    try {
      dispatch({type: GOOGLE_AUTH});

      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      dispatch({
        type: GOOGLE_AUTH_SUCCESS,
        isLoggedIn: true,
        ...user,
        ...tokens,
      });
      Alert.alert('Successfully logged in.');
    } catch (error: any) {
      dispatch({type: GOOGLE_AUTH_FAILURE, isLoggedIn, error});
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google play services not available or outdated !');
      } else {
        console.log(error);
      }
    }
  };
}

export function logout(): ThunkAction<
  void,
  storeTypes.RootState,
  any,
  AnyAction
> {
  return async (dispatch, getState) => {
    try {
      dispatch({type: GOOGLE_AUTH});

      const result = await GoogleSignin.signOut();
      dispatch({type: GOOGLE_AUTH_SUCCESS, isLoggedIn: false, accessToken: ''});
      Alert.alert('Successfully logged out.');
    } catch (error: any) {
      dispatch({type: GOOGLE_AUTH_FAILURE, isLoggedIn: false, error});
      console.error(error);
      // Change this after testing to user friendly result
      Alert.alert(`An error occured during logout with code: ${error.code}`);
    }
  };
}
