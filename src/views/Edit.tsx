import React, {useRef} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {Header, Card} from '../components';
import DatePicker from 'react-native-date-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import editHeaderStyles from '../styles/header/edit';
import {humanReadableDate} from '../utils/helpers';
import {appTypes, storeTypes, transactionTypes} from '../types';
import {actions} from '../redux';
import {style} from '../styles';
import {Picker} from '@react-native-picker/picker';

function Edit() {
  const dispatch = useDispatch();
  const {selected, status} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const {editTarget} = useSelector((state: storeTypes.RootState) => state.app);

  const content = useRef<String>('');
  const editTargetRef = useRef(appTypes.EditTarget.NONE);

  function setContent(data: string) {
    content.current = data;
  }

  function clearContent() {
    content.current = '';
  }

  // Picker closes on rerender so we save change to ref to avoid rerender
  function onPressWithRef(newEditTarget: appTypes.EditTarget) {
    return () => {
      console.log('new edit target', editTarget, newEditTarget);
      if (editTargetRef.current !== newEditTarget) {
        editTargetRef.current = newEditTarget;
      }
    };
  }

  function onPress(newEditTarget: appTypes.EditTarget) {
    return () => {
      if (editTarget !== newEditTarget) {
        dispatch(actions.app.setEditTarget(newEditTarget));
      }

      setContent(selected[newEditTarget]);
    };
  }

  function closeWithRef() {
    editTargetRef.current = appTypes.EditTarget.NONE;
  }

  function close() {
    dispatch(actions.app.setEditTarget(appTypes.EditTarget.NONE));
  }

  function saveWithRef(data: any) {
    const updatedTransaction = {...selected, [editTargetRef.current]: data};

    closeWithRef();

    dispatch(actions.transaction.update(selected.id, updatedTransaction));
    dispatch(actions.transaction.select(updatedTransaction));

    clearContent();
  }

  function save(data: any) {
    const updatedTransaction = {...selected, [editTarget]: data};

    close();

    dispatch(actions.transaction.update(selected.id, updatedTransaction));
    dispatch(actions.transaction.select(updatedTransaction));

    clearContent();
  }

  const NameSection = () => {
    return (
      <Card onPress={onPress(appTypes.EditTarget.NAME)}>
        <View style={style.edit.heading}>
          <Text style={style.edit.headingTitle}>Name</Text>
        </View>
        {editTarget === appTypes.EditTarget.NAME ? (
          <TextInput
            autoFocus
            onChangeText={(content: string) => setContent(content)}
            placeholder="Name"
            defaultValue={selected.name}
            onEndEditing={() => save(content.current)}
          />
        ) : (
          <Text>{selected.name}</Text>
        )}
      </Card>
    );
  };

  const AmountSection = () => {
    return (
      <Card onPress={onPress(appTypes.EditTarget.AMOUNT)}>
        <View style={style.edit.heading}>
          <Text style={style.edit.headingTitle}>Amount</Text>
        </View>
        {editTarget === appTypes.EditTarget.AMOUNT ? (
          <TextInput
            autoFocus
            keyboardType="numeric"
            onChangeText={(content: string) => setContent(content)}
            placeholder="Amount"
            defaultValue={content.current as string}
            onEndEditing={() => save(content.current)}
          />
        ) : (
          <Text>{selected.amount}</Text>
        )}
      </Card>
    );
  };

  const DateSection = () => {
    const dateObj = new Date(selected.date);

    return (
      <Card onPress={onPress(appTypes.EditTarget.DATE)}>
        <View style={style.edit.heading}>
          <Text style={style.edit.headingTitle}>Date</Text>
        </View>
        <Text style={style.edit.sectionText}>{humanReadableDate(dateObj)}</Text>
        <DatePicker
          modal
          open={editTarget === appTypes.EditTarget.DATE}
          date={dateObj}
          onConfirm={(date: Date) => save(date)}
          onCancel={close}
        />
      </Card>
    );
  };

  const PaymentMethodSection = () => {
    return (
      <Card>
        <View style={style.edit.heading}>
          <Text style={style.edit.headingTitle}>Payment Method</Text>
        </View>
        <Picker
          style={{height: 60}}
          onFocus={onPressWithRef(appTypes.EditTarget.PAYMENT_METHOD)}
          selectedValue={selected.paymentMethod}
          onValueChange={(paymentMethod: transactionTypes.PaymentMethod) =>
            saveWithRef(paymentMethod)
          }>
          <Picker.Item
            value={transactionTypes.PaymentMethod.CASH}
            label="Cash"
          />
          <Picker.Item
            value={transactionTypes.PaymentMethod.CREDIT}
            label="Credit"
          />
          <Picker.Item
            value={transactionTypes.PaymentMethod.DEBIT}
            label="Debit"
          />
          <Picker.Item
            value={transactionTypes.PaymentMethod.CHECK}
            label="Check"
          />
          <Picker.Item
            value={transactionTypes.PaymentMethod.OTHER}
            label="Other"
          />
        </Picker>
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
        {selected && (
          <React.Fragment>
            <NameSection />
            <AmountSection />
            <DateSection />
            <PaymentMethodSection />
          </React.Fragment>
        )}
      </ScrollView>
    </React.Fragment>
  );
}

export default React.memo(Edit);
