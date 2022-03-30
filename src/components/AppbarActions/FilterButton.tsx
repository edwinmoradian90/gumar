import React from 'react';
import {Appbar} from 'react-native-paper';
import {useFilter, useModal, useSnackbar} from '../../hooks';
import {modalTypes} from '../../types';
import {colors} from '../../utils';

export default function FilterButton() {
  const filter = useFilter();
  const modal = useModal();
  const snackbar = useSnackbar();

  function showSnackbar(message: string) {
    const snackbarData = snackbar.create(message);
    snackbar.show(snackbarData);
  }

  function onPress() {
    modal.show(modalTypes.ModalVisible.FILTER);
  }

  function onLongPress() {
    if (!filter.isEnabled) return null;
    filter.hideAndReset();
    showSnackbar('Filter removed');
  }

  return (
    <Appbar.Action
      icon="filter-variant"
      color={filter.isEnabled ? colors.secondary : colors.iconButtonColor}
      onPress={onPress}
      onLongPress={onLongPress}
    />
  );
}
