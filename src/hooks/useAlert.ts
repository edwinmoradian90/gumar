import {useDispatch} from 'react-redux';
import {actions} from '../redux';
import {alertTypes} from '../types';

export default function useAlert() {
  const dispatch = useDispatch();

  function dismissAlert() {
    dispatch(actions.alert.setNotVisible());
  }

  function confirmAlert() {
    dismissAlert();
  }

  function denyAlert() {
    dismissAlert();
  }

  function create(
    title: string,
    body: string,
    confirm: string = 'Okay',
    deny: string = 'Cancel',
    onConfirm: () => void = confirmAlert,
    onDismiss: () => void = dismissAlert,
    onDeny: () => void = denyAlert,
  ) {
    return {
      title,
      body,
      confirm,
      deny,
      onConfirm,
      onDismiss,
      onDeny,
    };
  }

  function show(alert: Partial<alertTypes.State>) {
    dispatch(actions.alert.setVisible(alert));
  }

  function hide() {
    dispatch(actions.alert.setNotVisible());
  }

  return {
    create,
    show,
    hide,
  };
}
