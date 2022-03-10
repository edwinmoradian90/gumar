import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {ScrollView, View, StyleSheet, Text, TextInput} from 'react-native';
import {Header} from '.';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {Picker} from '@react-native-picker/picker';
import {modalTypes, storeTypes} from '../types';
import {colors} from '../utils';

export default function Filter(data?: any) {
  const dispatch = useDispatch();
  const {modalVisible} = useSelector(
    (state: storeTypes.RootState) => state.modal,
  );
  const [range, setRange] = useState({from: 0, to: 100});

  return (
    <ReactNativeModal
      style={styles.modalContainer}
      isVisible={modalVisible === modalTypes.ModalVisible.FILTER}
      swipeDirection={['down']}
      onBackdropPress={() => dispatch(actions.modal.setNotVisible())}
      onSwipeComplete={() => dispatch(actions.modal.setNotVisible())}>
      <ScrollView style={styles.modalView}>
        <Header title="Filter" left={['title']} right={['close']} />
        <View style={styles.contentContainer}>
          <Text>Filter</Text>
          <View>
            <Text>Name</Text>
            <TextInput placeholder="Transaction name" />
          </View>
          <View>
            <Text>Payment type</Text>
            <Picker>
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Cash" value="cash" />
              <Picker.Item label="Credit" value="credit" />
              <Picker.Item label="Debit" value="debit" />
              <Picker.Item label="Check" value="check" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          <View>
            <Text>Payment category</Text>
            <Picker>
              <Picker.Item label="All" value="all" />
              <Picker.Item label="One time payment" value="one-time-payment" />
              <Picker.Item
                label="Reccuring payment "
                value="recurring-payment"
              />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          <View>
            <Text>Range</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text>From</Text>
              <Text>{range.from}</Text>
              <Text>To</Text>
              <Text>{range.to}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MultiSlider
                values={[range.from, range.to]}
                onValuesChange={(values: any) => {
                  setRange({from: values[0], to: values[1]});
                }}
                min={0}
                max={100}
                allowOverlap={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    marginTop: 20,
  },
  modalView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    padding: 20,
  },
  contentContainer: {},
});
