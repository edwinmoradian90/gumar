import React from 'react';
import {Appbar, Divider} from 'react-native-paper';
import {useModeCheck} from '../hooks';
import {colors} from '../utils';

export default function Toolbar({
  title = 'All',
  spaceTop = 0,
}: {
  title?: string;
  spaceTop?: number;
}) {
  const {isSelectMode} = useModeCheck();

  return (
    <Appbar.Header
      style={{
        marginTop: spaceTop,
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
      <Appbar.Action size={22} icon="export" />
      <Appbar.Action size={22} icon="filter-variant" />
      <Appbar.Action size={22} icon="sort" />
      <Appbar.Action size={22} icon="trash-can-outline" />
      <Appbar.Action size={22} icon="checkbox-blank-outline" />
    </Appbar.Header>
  );
}
