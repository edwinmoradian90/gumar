import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {appTypes, storeTypes} from '../types';
import {helpers} from '../utils';

export default function useAppData() {
  const dispatch = useDispatch();
  const app = useSelector((state: storeTypes.RootState) => state.app);

  const inquiry = useMemo(() => {
    const states: {[index: string]: boolean} = {};
    const appData = {
      mode: appTypes.Mode,
      page: appTypes.Page,
      status: appTypes.Status,
      editTarget: appTypes.EditTarget,
    };

    console.log(appTypes.Mode);
    Object.keys(appData).forEach((appDataKey: string) => {
      const appDataProp = appData[appDataKey as keyof typeof appData];
      Object.keys(appDataProp).forEach((appDataPropKey: string) => {
        const value = appTypes[appDataPropKey as keyof typeof appDataProp];
        return (states[
          `is${helpers.capitalize(
            appDataProp[appDataPropKey as keyof typeof appDataProp],
          )}${helpers.capitalize(appDataKey)}`
        ] = app[appDataKey as keyof typeof appData] === value);
      });
    });
    return states;
  }, []);

  function setPage(page: appTypes.Page) {
    dispatch(actions.app.setPage(page));
  }

  function setStatus(status: appTypes.Status) {
    dispatch(actions.app.setStatus(status));
  }

  function setMode(mode: appTypes.Mode) {
    dispatch(actions.app.setMode(mode));
  }

  function setEditTarget(editTarget: appTypes.EditTarget) {
    dispatch(actions.app.setEditTarget(editTarget));
  }

  return {
    data: app,
    setPage,
    setStatus,
    setMode,
    setEditTarget,
    inquiry,
  };
}
