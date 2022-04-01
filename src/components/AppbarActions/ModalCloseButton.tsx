import React from 'react';
import {Appbar} from 'react-native-paper';
import {useModal} from '../../hooks';
import {colors} from '../../utils';

export default function ModalCloseButton() {
  const modal = useModal();

  return (
    <Appbar.Action
      color={colors.iconButtonColor}
      icon="close"
      onPress={modal.hide}
    />
  );
}
