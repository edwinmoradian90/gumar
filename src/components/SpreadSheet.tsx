import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Button, Text, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  useModal,
  useMode,
  useSelect,
  useSnackbar,
  useSpreadSheet,
  useTransactions,
} from '../hooks';
import {appTypes, selectTypes, spreadSheetTypes, storeTypes} from '../types';
import {colors} from '../utils';

export default function SpreadSheet() {
  // const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const {accessToken} = useSelector(
    (state: storeTypes.RootState) => state.account,
  );
  const spreadsheets = useSpreadSheet();
  const modal = useModal();
  const mode = useMode();
  const snackbar = useSnackbar();
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
    setSubmitted(true);
    spreadsheets.create(accessToken, spreadSheet.current, transactions);
  }

  function handleClear() {
    spreadsheets.clear();
    // dispatch(actions.spreadSheet.clear());
    clearInputs();
  }

  function handleSnackbar() {
    const s = snackbar.create(
      `Spread sheet ${spreadSheet.current.title} created`,
    );
    snackbar.show(s);
  }

  function resetSelect() {
    mode.setMode(appTypes.Mode.DEFAULT);
    selectionObject.setAll('transactions', selectTypes.Status.UNCHECKED);
  }

  function onSuccess() {
    resetSelect();
    modal.hide();
    handleSnackbar();
    setSubmitted(false);
  }

  console.log(spreadsheets.isSuccessStatus);

  useEffect(() => {
    if (submitted && spreadsheets.isSuccessStatus) onSuccess();
  }, [submitted, spreadsheets.isSuccessStatus]);

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
        {/* <Button color={colors.secondary} onPress={handleClear}>
          Clear
        </Button> */}
        <ActivityIndicator
          size="small"
          color={colors.secondary}
          animating={spreadsheets.isLoadingStatus}
        />
        <Button color={colors.secondary} onPress={handleCreate}>
          {spreadsheets.isLoadingStatus ? 'Creating...' : 'Create'}
        </Button>
      </View>
    </View>
  );
}
