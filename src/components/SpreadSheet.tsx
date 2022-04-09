import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
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

export default function SpreadSheet({
  isVisible,
  setIsVisible,
}: {
  isVisible?: boolean;
  setIsVisible: (arg: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
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

  function handleCreate() {
    setSubmitted(true);
    spreadsheets.create(accessToken, {title}, transactions);
  }

  function handleSnackbar() {
    const s = snackbar.create(`Spread sheet ${title} created`);
    snackbar.show(s);
  }

  function resetSelect() {
    mode.setMode(appTypes.Mode.DEFAULT);
    selectionObject.setAll('transactions', selectTypes.Status.UNCHECKED);
  }

  function onSuccess() {
    resetSelect();
    setIsVisible(false);
    handleSnackbar();
    setSubmitted(false);
  }

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
        onChangeText={content => setTitle(content)}
        defaultValue={title as spreadSheetTypes.SpreadSheet['title']}
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
