import React, {useState, useRef} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {Header, Card} from '../components';
import {secondary} from '../utils/colors';
import {Status} from '../types/app';
import DatePicker from 'react-native-date-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import editHeaderStyles from '../styles/header/edit';
import {capitalize, humanReadableDate, splitDate} from '../utils/helpers';
import {storeTypes, transactionTypes} from '../types';
import {actions} from '../redux';
import {style} from '../styles';
import {Picker} from '@react-native-picker/picker';

function Edit() {
  const includedKeys = ['name', 'amount', 'paymentMethod', 'date'];
  const dispatch = useDispatch();
  const {selected, status} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );

  const content: any = useRef('');
  const initialAttributeState = {key: null, value: null} as SelectedAttribute;
  const [editMode, setEditMode] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(
    initialAttributeState,
  );
  const [paymentMethod, setPaymentMethod] = useState(
    transactionTypes.PaymentMethod.CASH,
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

    dispatch(actions.transaction.update(selected.id, updatedTransaction));
    dispatch(actions.transaction.select(updatedTransaction));
  }

  function onEndEditing(dataKey: string) {
    setEditMode(false);
    saveEdit(dataKey);
  }

  const DateSection = () => {
    const dateObj = new Date(selected.date);
    const key = 'date';
    return (
      <React.Fragment>
        <View style={style.edit.heading}>
          <Text style={style.edit.headingTitle}>Date</Text>
        </View>
        <Text style={style.edit.sectionText}>{humanReadableDate(dateObj)}</Text>
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
      </React.Fragment>
    );
  };

  const PaymentMethodSection = () => {
    return (
      <React.Fragment>
        <View style={style.edit.heading}>
          <Text style={style.edit.headingTitle}>Payment Method</Text>
        </View>
        <Picker
          selectedValue={paymentMethod}
          onValueChange={(newValue: number) => setPaymentMethod(newValue)}>
          <Picker.Item value={0} label="Cash" />
        </Picker>
      </React.Fragment>
    );
  };

  const Section = ({data, dataKey: key}: {data: string; dataKey: string}) => {
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
      <Card style={style.edit.card} onPress={() => onSelect(data, key)}>
        <View style={style.edit.icon}>{Icon && Icon}</View>
        <View>
          <View style={style.edit.heading}>
            <Text style={style.edit.headingTitle}>{capitalize(key)}</Text>
          </View>
          {editMode && isMatch && key !== 'paymentMethod' ? (
            key !== 'date' ? (
              <TextInput
                autoFocus
                style={style.edit.sectionText}
                defaultValue={content.current}
                keyboardType={keyboardType}
                onEndEditing={() => onEndEditing(key)}
                onChangeText={content => setContent(content)}
              />
            ) : (
              <React.Fragment>
                <Text style={style.edit.sectionText}>
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
              </React.Fragment>
            )
          ) : (
            <React.Fragment>
              {key === 'paymentMethod' ? (
                <React.Fragment>
                  <Text style={style.edit.headingTitle}>Payment Method</Text>
                  <Picker>
                    <Picker.Item
                      value={transactionTypes.PaymentMethod.CASH}
                      label="Cash"
                    />
                  </Picker>
                </React.Fragment>
              ) : (
                <Text style={style.edit.sectionText}>
                  {key === 'date' ? humanReadableDate(dateObj) : data}
                </Text>
              )}
            </React.Fragment>
          )}
        </View>
      </Card>
    );
  };

  return (
    <React.Fragment>
      <Header left={['back']} right={['trash']} styles={editHeaderStyles} />
      <ScrollView style={style.edit.container}>
        {selected && (
          <View style={style.edit.snapshotContainer}>
            <Text style={style.edit.snapshotAmount}>${selected.amount}</Text>
            <Text style={style.edit.snapshotName}>{selected.name}</Text>
            <Text style={style.edit.snapshotDate}>
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
    </React.Fragment>
  );
}

export default React.memo(Edit);
