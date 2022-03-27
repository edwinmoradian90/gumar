import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useMode, useSelect} from '../hooks';
import {appTypes, selectTypes} from '../types';
import {colors} from '../utils';

export default function Toolbar({
  title = 'All',
  startSpace = 0,
}: {
  title?: string;
  startSpace?: number;
}) {
  const {setMode, isSelectMode} = useMode();
  const {selectionObject} = useSelect();

  const [allSelected, setAllSelected] = useState(false);

  function handleSelectModePress() {
    const mode = !isSelectMode ? appTypes.Mode.SELECT : appTypes.Mode.DEFAULT;
    if (isSelectMode) {
      selectionObject.setAll('transactions', selectTypes.Status.UNCHECKED);
      if (allSelected) setAllSelected(false);
    }
    setMode(mode);
  }

  function selectModeLongPress() {
    if (!isSelectMode) return null;
    const value = allSelected
      ? selectTypes.Status.UNCHECKED
      : selectTypes.Status.CHECKED;
    selectionObject.setAll('transactions', value);
    setAllSelected(!allSelected);
  }

  return (
    <Appbar.Header
      style={{
        marginTop: startSpace,
        paddingBottom: 10,
        backgroundColor: colors.background,
        elevation: 1,
        height: 40,
        justifyContent: 'flex-end',
      }}>
      <Appbar.Content
        titleStyle={{color: colors.title, fontSize: 16, marginLeft: 10}}
        title={title}
      />
      <View
        style={{
          borderRightColor: colors.muted,
          marginHorizontal: 5,
          borderRightWidth: 1,
        }}>
        <Appbar.Action
          color={isSelectMode ? colors.secondary : colors.iconButtonColor}
          size={22}
          icon="checkbox-marked-outline"
          onPress={handleSelectModePress}
          onLongPress={selectModeLongPress}
        />
      </View>
      <Appbar.Action size={22} icon="export" />
      <Appbar.Action size={22} icon="filter-variant" />
      <Appbar.Action size={22} icon="sort" />
      <Appbar.Action size={22} icon="trash-can-outline" />
    </Appbar.Header>
  );
}
