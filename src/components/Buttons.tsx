import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommuntiyIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pressable} from 'react-native';
import {colors} from '../utils';

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
        color={styles?.addButton?.color || colors.secondary || 'black'}
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
export function Checkmark({
  onPress,
  onLongPress,
  styles,
}: {
  onPress?: () => void;
  onLongPress?: () => void;
  styles?: any;
}) {
  return (
    <Pressable
      style={[styles?.checkmark]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <IonIcon
        name="checkmark"
        size={20}
        color={styles?.checkmark?.color || colors.secondary}
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
        color={styles?.filterButton?.color || colors.primary}
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
        color={styles?.exportButton?.color || colors.primary}
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
        color={styles?.closeButton?.color || colors.secondary}
      />
    </Pressable>
  );
}

export function ANameSort({
  onPress,
  onLongPress,
  styles,
}: {
  onPress?: () => void;
  onLongPress?: () => void;
  styles?: any;
}) {
  return (
    <Pressable
      style={[styles?.sortOptions]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <MaterialCommuntiyIcon
        name="sort-alphabetical-ascending"
        size={20}
        color={styles?.sortOptions?.color || colors.secondary}
      />
    </Pressable>
  );
}

export function DNameSort({
  onPress,
  onLongPress,
  styles,
}: {
  onPress?: () => void;
  onLongPress?: () => void;
  styles?: any;
}) {
  return (
    <Pressable
      style={[styles?.sortOptions]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <MaterialCommuntiyIcon
        name="sort-alphabetical-descending"
        size={20}
        color={styles?.sortOptions?.color || colors.secondary}
      />
    </Pressable>
  );
}

export function AAmountSort({
  onPress,
  onLongPress,
  styles,
}: {
  onPress?: () => void;
  onLongPress?: () => void;
  styles?: any;
}) {
  return (
    <Pressable
      style={[styles?.sortOptions]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <MaterialCommuntiyIcon
        name="sort-numeric-ascending"
        size={20}
        color={styles?.sortOptions?.color || colors.secondary}
      />
    </Pressable>
  );
}

export function DAmountSort({
  onPress,
  onLongPress,
  styles,
}: {
  onPress?: () => void;
  onLongPress?: () => void;
  styles?: any;
}) {
  return (
    <Pressable
      style={[styles?.sortOptions]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <MaterialCommuntiyIcon
        name="sort-numeric-descending"
        size={20}
        color={styles?.sortOptions?.color || colors.secondary}
      />
    </Pressable>
  );
}

export function ADateSort({
  onPress,
  onLongPress,
  styles,
}: {
  onPress?: () => void;
  onLongPress?: () => void;
  styles?: any;
}) {
  return (
    <Pressable
      style={[styles?.sortOptions]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <MaterialCommuntiyIcon
        name="sort-calendar-ascending"
        size={20}
        color={styles?.sortOptions?.color || colors.secondary}
      />
    </Pressable>
  );
}

export function DDateSort({
  onPress,
  onLongPress,
  styles,
}: {
  onPress?: () => void;
  onLongPress?: () => void;
  styles?: any;
}) {
  return (
    <Pressable
      style={[styles?.sortOptions]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <MaterialCommuntiyIcon
        name="sort-calendar-descending"
        size={20}
        color={styles?.sortOptions?.color || colors.secondary}
      />
    </Pressable>
  );
}
