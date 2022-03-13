import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import * as Buttons from './Buttons';
import {IList} from '.';
import {actions} from '../redux';
import {style} from '../styles';
import {modalTypes, sortTypes, storeTypes} from '../types';
import {colors} from '../utils';

const data = [
  {
    option: sortTypes.SortBy.NAME,
    name: 'Name',
  },
  {
    option: sortTypes.SortBy.DATE,
    name: 'Date',
  },
  {
    option: sortTypes.SortBy.AMOUNT,
    name: 'Amount',
  },
];

export default function SortOptions() {
  const dispatch = useDispatch();
  const {modalVisible} = useSelector(
    (state: storeTypes.RootState) => state.modal,
  );
  const {sortBy} = useSelector((state: storeTypes.RootState) => state.sort);
  const styles = style.popup.main;

  function handleSelect(option: sortTypes.SortBy) {
    dispatch(actions.sort.setSortBy(option));
    dispatch(actions.modal.setNotVisible());
  }

  const SortOption = ({listItemData}: {listItemData?: any}) => {
    const {name, option} = listItemData || {};
    return (
      <Pressable
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 60,
          borderBottomColor: colors.gray,
          borderBottomWidth: 1,
          width: '100%',
        }}
        onPress={() => handleSelect(option)}>
        <Text>{name}</Text>
        {sortBy === option && <Buttons.Checkmark />}
      </Pressable>
    );
  };

  return (
    <ReactNativeModal
      style={styles.container}
      animationIn="fadeInRightBig"
      animationOut="fadeOutRightBig"
      isVisible={modalVisible === modalTypes.ModalVisible.SORT_OPTIONS}
      swipeDirection={['down', 'right']}
      onBackdropPress={() => dispatch(actions.modal.setNotVisible())}
      onSwipeComplete={() => dispatch(actions.modal.setNotVisible())}>
      <ScrollView style={styles.modal}>
        <Text style={sortOptionsStyle.header}>Sort options</Text>
        <IList data={data}>
          <SortOption />
        </IList>
      </ScrollView>
    </ReactNativeModal>
  );
}

const sortOptionsStyle = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    marginTop: 20,
  },
  modalView: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 20,
  },
  header: {
    fontSize: 20,
  },
});
