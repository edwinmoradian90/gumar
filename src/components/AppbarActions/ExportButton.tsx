import React from 'react';
import {Appbar} from 'react-native-paper';
import {useAlert, useExport, useSelect} from '../../hooks';
import {selectTypes} from '../../types';
import {colors} from '../../utils';

export default function ExportButton() {
  const exp = useExport();
  const alert = useAlert();
  const {selectionObject} = useSelect();

  const isAnySelected = selectionObject.hasAnySelected(
    'transactions',
    selectTypes.Status.CHECKED,
  );

  function onPress() {
    const alertData = alert.create(
      'Are you sure?',
      'Export selected transactions?',
      'Export',
      'Cancel',
      () => {
        alert.hide();
        exp.show();
      },
    );

    alert.show(alertData);
  }

  return (
    <Appbar.Action
      color={colors.iconButtonColor}
      icon="export"
      disabled={!isAnySelected}
      size={22}
      onPress={onPress}
    />
  );
}
