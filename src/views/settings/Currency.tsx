import React from 'react';
import {Pressable, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import List from '../../components/List';
import {currencies} from '../../data/currency';
import {selectCurrency} from '../../redux/actions/settings';
import {RootState} from '../../redux/types/store';
import settingsListStyles from '../../styles/list/settings';
import settingsStyles from '../../styles/settings';
import {primary} from '../../utils/colors';

export default function Currency() {
  const {currency} = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  function onPress(item: any) {
    dispatch(selectCurrency(item.id));
  }

  // update type for item
  const CheckMark = ({item}: {item?: any}) => {
    if (item.id !== currency) return null;
    return (
      <Pressable>
        <FontAwesome5Icon name="check" size={16} color={primary} />
      </Pressable>
    );
  };

  return (
    <View style={settingsStyles.container}>
      <Header title="Currency" right={['back', 'title']} />
      <Text style={settingsStyles.heading}>Select a currency</Text>
      <List
        data={currencies}
        exclude={['id']}
        styles={settingsListStyles}
        onPress={onPress}>
        <CheckMark />
      </List>
    </View>
  );
}
