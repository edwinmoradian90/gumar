import React from 'react';
import {Appbar} from 'react-native-paper';
import {useAlert, useExport} from '../../hooks';
import {colors} from '../../utils';

export default function ExportButton() {
  const exp = useExport();
  const alert = useAlert();

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
      size={22}
      onPress={onPress}
    />
  );
}
