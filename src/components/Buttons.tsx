import React from 'react';
import {Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {primary, secondary, white} from '../utils/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export function Trash({onPress, styles}: {onPress?: () => void; styles?: any}) {
  return (
    <Pressable style={styles.trashButton} onPress={onPress}>
      <IonIcon
        name="ios-trash-outline"
        size={22}
        color={styles.trashButton.color}
      />
    </Pressable>
  );
}

export function Add({onPress, styles}: {onPress?: () => void; styles?: any}) {
  return (
    <Pressable style={styles.addButton} onPress={onPress}>
      <AntDesign
        name="plus"
        size={22}
        color={styles?.addButton?.color || secondary || 'black'}
      />
    </Pressable>
  );
}

export function Back({onPress, styles}: {onPress?: () => void; styles?: any}) {
  return (
    <Pressable style={styles.backButton} onPress={onPress}>
      <EntypoIcon
        name="chevron-thin-left"
        size={18}
        color={styles.backButton.color}
      />
    </Pressable>
  );
}

export function Filter({
  onPress,
  styles,
}: {
  onPress?: () => void;
  styles?: any;
}) {
  return (
    <Pressable style={styles.filterButton} onPress={onPress}>
      <IonIcon
        name="ios-filter-outline"
        size={22}
        color={styles?.filterButton?.color || white}
      />
    </Pressable>
  );
}

export function Export({
  onPress,
  styles,
}: {
  onPress?: () => void;
  styles?: any;
}) {
  return (
    <Pressable style={styles.exportButton} onPress={onPress}>
      <AntDesign
        name="export"
        size={20}
        color={styles?.exportButton?.color || white}
      />
    </Pressable>
  );
}

export function Close({onPress, styles}: {onPress?: () => void; styles?: any}) {
  return (
    <Pressable style={[styles.closeButton]} onPress={onPress}>
      <AntDesign
        name="close"
        size={20}
        color={styles?.closeButton?.color || secondary}
      />
    </Pressable>
  );
}
