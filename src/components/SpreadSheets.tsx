import {Picker} from '@react-native-picker/picker';
import React, {useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {clear, create} from '../redux/actions/spreadSheets';
import {Separator, SpreadSheetProps} from '../redux/types/spreadSheets';
import {RootState} from '../redux/types/store';
import {primary, secondary, white} from '../utils/colors';

export default function SpreadSheet() {
  const dispatch = useDispatch();
  const {accessToken} = useSelector((state: RootState) => state.account);
  const {transactions} = useSelector((state: RootState) => state.transaction);
  const initialSpreadSheetData = {
    title: '',
    from: '',
    to: '',
    separator: Separator.months,
    numberOfDays: 0,
  };

  const spreadSheet = useRef<Omit<SpreadSheetProps, 'id'>>(
    initialSpreadSheetData,
  );

  function setData(content: string, key: string) {
    spreadSheet.current[key] = content;
    console.log(spreadSheet);
  }

  //create, edit, delete, read
  // modal for each

  // selecting the data, formating, exporting data

  // select time period,
  function clearInputs() {
    spreadSheet.current = initialSpreadSheetData;
  }

  function handleCreate() {
    dispatch(create(accessToken, spreadSheet.current, transactions));
    clearInputs();
  }

  function handleClear() {
    dispatch(clear());
    clearInputs();
  }

  //   async function create() {
  //     const body = {
  //       properties: {
  //         title: 'TEST',
  //       },
  //     };
  //     try {
  //       console.log('TRY');
  //       const data = await fetch(URL, {
  //         method: 'POST',
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(body),
  //       });
  //       const result = await data.json();

  //       console.log(result.spreadsheetId);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  return (
    <View>
      <TextInput
        onChangeText={content => setData(content, 'title')}
        defaultValue={spreadSheet.current.title as SpreadSheetProps['title']}
        placeholder="Sheet Title"
      />
      <Pressable
        style={{
          borderRadius: 5,
          backgroundColor: secondary,
          marginBottom: 20,
          padding: 10,
          width: 175,
        }}
        onPress={handleCreate}>
        <Text style={{color: primary, textAlign: 'center'}}>
          Create Spread Sheet
        </Text>
      </Pressable>
      <Pressable
        style={{
          padding: 10,
          borderRadius: 5,
          backgroundColor: secondary,
          width: 175,
        }}
        onPress={handleClear}>
        <Text style={{color: primary, textAlign: 'center'}}>Clear Sheets</Text>
      </Pressable>
      {/* <TextInput
          onChangeText={content => setData(content, 'from')}
          defaultValue={data.from as SpreadSheetProps['from']}
          placeholder="From"
        />
        <TextInput
          onChangeText={content => setData(content, 'to')}
          defaultValue={data.to as SpreadSheetProps['to']}
          placeholder="To"
        />
        <Picker
          selectedValue={data.separator as string}
          onValueChange={(value: string) => setData(value, 'separator')}>
          <Picker.Item label="Days" value="days" />
          <Picker.Item label="Weeks" value="weeks" />
          <Picker.Item label="Months" value="months" />
          <Picker.Item label="Years" value="years" />
        </Picker> */}
    </View>
  );
}
