import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Dimensions, Text, View} from 'react-native';
import useHeaderActions from '../hooks/useHeaderActions';
import {setModalVisible} from '../redux/actions/modal';
import {removeTransaction} from '../redux/actions/transaction';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/types/store';
import headerStyles from '../styles/header/main';
import * as Buttons from './Buttons';
import {capitalize} from '../utils/helpers';
import uuid from 'react-native-uuid';
import {ModalVisible} from '../redux/types/modal';

export default function Header({
  title,
  left = [],
  right = [],
  center = [],
  actions = {},
  styles = headerStyles,
}: {
  title?: string;
  left?: string[];
  right?: string[];
  center?: string[];
  actions?: {[index: string]: (...args: any) => void};
  styles?: any;
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const headerActions = useHeaderActions();
  const {selected} = useSelector((state: RootState) => state.transaction);

  function handleRemoveTransaction() {
    dispatch(removeTransaction(selected.id));
    navigation.goBack();
  }

  function handleNewTransaction() {
    dispatch(setModalVisible(ModalVisible.ADD));
  }

  function handleGoBack() {
    if (navigation.canGoBack()) navigation.goBack();
  }

  function calculateSectionWidth() {
    let n = 0;
    const screenWidth = Dimensions.get('screen').width;
    left.length > 0 && n++;
    center.length > 0 && n++;
    right.length > 0 && n++;

    if (n === 0) return screenWidth;
    return screenWidth / n;
  }

  function createHeaderSection(section: string[]) {
    return section.map((name: string) => {
      const key = uuid.v4().toString();
      const capitalizedName = capitalize(name);
      if (name === 'title') {
        return (
          <View key={key} style={styles.title}>
            {title && <Text style={styles.titleText}>{title}</Text>}
          </View>
        );
      }

      if (Buttons.hasOwnProperty(capitalizedName)) {
        const Button = Buttons[capitalizedName as keyof typeof Buttons];
        const onPress =
          headerActions[name] || headerActions[capitalizedName] || undefined;
        return <Button onPress={onPress} key={key} styles={styles} />;
      }

      return null;
    });
  }

  useLayoutEffect(() => {}, []);

  const sectionWidth = calculateSectionWidth();

  return (
    <View style={styles.container}>
      {left.length > 0 && (
        <View style={[styles.left]}>{createHeaderSection(left)}</View>
      )}
      {center.length > 0 && (
        <View style={[styles.center]}>{createHeaderSection(center)}</View>
      )}
      {right.length > 0 && (
        <View style={[styles.right]}>{createHeaderSection(right)}</View>
      )}
    </View>
  );
}
