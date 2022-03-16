import React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';

export default function Alert({
  visible,
  onDismiss,
  title,
  body,
  onConfirm,
  onDeny,
  confirm = 'Ok',
  deny = 'Cancel',
}: {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  body?: string;
  onConfirm?: () => void;
  onDeny?: () => void;
  confirm?: string;
  deny?: string;
}) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{body}</Paragraph>
        </Dialog.Content>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Dialog.Actions>
            <Button onPress={onConfirm}>{confirm}</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={onDeny}>{deny}</Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
}
