import React, {useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useSelect, useTransactions} from '../hooks';
import {actions} from '../redux';
import {selectTypes, spreadSheetTypes, storeTypes} from '../types';
import {colors} from '../utils';

export default function SpreadSheet() {
  const dispatch = useDispatch();
  const {accessToken} = useSelector(
    (state: storeTypes.RootState) => state.account,
  );
  const {selectionObject} = useSelect();

  const transactions = useTransactions({
    selected: selectionObject.filter(
      selectionObject.get('transactions'),
      selectTypes.Status.CHECKED,
    ),
  });

  const initialSpreadSheetData = {
    title: '',
    from: '',
    to: '',
    separator: spreadSheetTypes.Separator.MONTHS,
    numberOfDays: 0,
  };

  const spreadSheet = useRef<Omit<spreadSheetTypes.SpreadSheet, 'id'>>(
    initialSpreadSheetData,
  );

  function setData(content: string, key: string) {
    spreadSheet.current[key] = content;
    console.log(spreadSheet);
  }

  function clearInputs() {
    spreadSheet.current = initialSpreadSheetData;
  }

  function handleCreate() {
    dispatch(
      actions.spreadSheet.create(
        accessToken,
        spreadSheet.current,
        transactions,
      ),
    );
    clearInputs();
  }

  function handleClear() {
    dispatch(actions.spreadSheet.clear());
    clearInputs();
  }

  return (
    <View>
      <TextInput
        style={{backgroundColor: colors.background}}
        label="Title"
        mode="outlined"
        activeOutlineColor={colors.secondary}
        onChangeText={content => setData(content, 'title')}
        defaultValue={
          spreadSheet.current.title as spreadSheetTypes.SpreadSheet['title']
        }
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 20,
        }}>
        <Button color={colors.secondary} onPress={handleClear}>
          Clear
        </Button>
        <Button
          mode="contained"
          color={colors.secondary}
          onPress={handleCreate}>
          Create
        </Button>
      </View>
    </View>
  );
}
