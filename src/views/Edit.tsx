import React, {useState, useRef} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Card from '../components/Card';
import {secondary} from '../utils/colors';
import {Status} from '../types/app';
import DatePicker from 'react-native-date-picker';
import editStyles from '../styles/edit';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/types/store';
import {
  selectTransaction,
  updateTransaction,
} from '../redux/actions/transaction';
import Header from '../components/Header';
import editHeaderStyles from '../styles/header/edit';
import {capitalize, humanReadableDate, splitDate} from '../utils/helpers';

function Edit() {
  const includedKeys = ['name', 'amount', 'date'];
  const dispatch = useDispatch();
  const {selected, status} = useSelector(
    (state: RootState) => state.transaction,
  );

  const content: any = useRef('');
  const initialAttributeState = {key: null, value: null} as SelectedAttribute;
  const [editMode, setEditMode] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(
    initialAttributeState,
  );

  type SelectedAttribute = {
    key: string | null;
    value: string | Date | null;
  };

  function setContent(data: string | Date) {
    content.current = data;
  }

  function clearContent() {
    content.current = '';
  }

  function onSelect(data: string | Date, dataKey: string) {
    clearContent();
    setContent(data);
    if (editMode && selectedAttribute.key === dataKey) {
      setEditMode(false);
      setSelectedAttribute(initialAttributeState);
    } else if (editMode && selectedAttribute.key !== dataKey) {
      const item = {key: dataKey, value: data};
      setSelectedAttribute(item);
    } else {
      const item = {key: dataKey, value: data};
      setEditMode(!editMode);
      setSelectedAttribute(item);
    }
  }

  function saveEdit(key: string) {
    const updatedTransaction =
      key === 'date'
        ? {...selected, [key]: content.current, ...splitDate(content.current)}
        : {...selected, [key]: content.current};

    dispatch(updateTransaction(selected.id, updatedTransaction));
    dispatch(selectTransaction(updatedTransaction));
  }

  function onEndEditing(dataKey: string) {
    setEditMode(false);
    saveEdit(dataKey);
  }

  const Section = ({data, dataKey: key}: {data: string; dataKey: string}) => {
    if (key === 'id') return null;

    const isMatch = selectedAttribute.key === key;
    const keyboardType = isNaN(selected[key]) ? 'default' : 'numeric';
    const dateObj = new Date(selected['date']);

    const NameIcon = (
      <FontAwesome5Icon name="file-alt" size={22} color={secondary} />
    );

    const AmountIcon = (
      <FontAwesome5Icon name="money-bill-wave" size={22} color={secondary} />
    );

    const DateIcon = (
      <FontAwesome5Icon name="calendar" size={22} color={secondary} />
    );

    // add type later
    const icons: any = {
      name: NameIcon,
      amount: AmountIcon,
      date: DateIcon,
    };

    const Icon = icons[key];

    return (
      <Card style={editStyles.card} onPress={() => onSelect(data, key)}>
        <View style={editStyles.icon}>{Icon && Icon}</View>
        <View>
          <View style={editStyles.heading}>
            <Text style={editStyles.headingTitle}>{capitalize(key)}</Text>
          </View>
          {editMode && isMatch ? (
            key !== 'date' ? (
              <TextInput
                autoFocus
                style={editStyles.sectionText}
                defaultValue={content.current}
                keyboardType={keyboardType}
                onEndEditing={() => onEndEditing(key)}
                onChangeText={content => setContent(content)}
              />
            ) : (
              <>
                <Text style={editStyles.sectionText}>
                  {humanReadableDate(dateObj)}
                </Text>
                <DatePicker
                  modal
                  open={editMode}
                  date={dateObj}
                  onConfirm={(date: Date) => {
                    setContent(date);
                    onEndEditing(key);
                  }}
                  onCancel={() => setEditMode(false)}
                />
              </>
            )
          ) : (
            <Text style={editStyles.sectionText}>
              {key === 'date' ? humanReadableDate(dateObj) : data}
            </Text>
          )}
        </View>
      </Card>
    );
  };

  return (
    <>
      <Header left={['back']} right={['trash']} styles={editHeaderStyles} />
      <ScrollView style={editStyles.container}>
        {selected && (
          <View style={editStyles.snapshotContainer}>
            <Text style={editStyles.snapshotAmount}>${selected.amount}</Text>
            <Text style={editStyles.snapshotName}>{selected.name}</Text>
            <Text style={editStyles.snapshotDate}>
              {humanReadableDate(selected.date.toString())}
            </Text>
          </View>
        )}
        {selected &&
          Object.keys(selected)
            .filter((key: string) => includedKeys.includes(key))
            .map(key => {
              const data =
                status === Status.LOADING && selectedAttribute.key === key
                  ? 'Loading'
                  : selected[key];
              return <Section key={`data__${key}`} dataKey={key} data={data} />;
            })}
      </ScrollView>
    </>
  );
}

export default React.memo(Edit);
