import React, {useRef} from 'react';
import {Pressable, Text, View, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {spreadSheetTypes, storeTypes} from '../types';
import {colors} from '../utils';

export default function SpreadSheet() {
  const dispatch = useDispatch();
  const {accessToken} = useSelector(
    (state: storeTypes.RootState) => state.account,
  );
  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
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
        onChangeText={content => setData(content, 'title')}
        defaultValue={
          spreadSheet.current.title as spreadSheetTypes.SpreadSheet['title']
        }
        placeholder="Sheet Title"
      />
      <Pressable
        style={{
          borderRadius: 5,
          backgroundColor: colors.secondary,
          marginBottom: 20,
          padding: 10,
          width: 175,
        }}
        onPress={handleCreate}>
        <Text style={{color: colors.primary, textAlign: 'center'}}>
          Create Spread Sheet
        </Text>
      </Pressable>
      <Pressable
        style={{
          padding: 10,
          borderRadius: 5,
          backgroundColor: colors.secondary,
          width: 175,
        }}
        onPress={handleClear}>
        <Text style={{color: colors.primary, textAlign: 'center'}}>
          Clear Sheets
        </Text>
      </Pressable>
    </View>
  );
}
