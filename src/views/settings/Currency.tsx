import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Pressable, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Header, List} from '../../components';
import {currencies} from '../../data/currency';
import {actions} from '../../redux';
import settingsListStyles from '../../styles/list/settings';
import settingsStyles from '../../styles/settings';
import {storeTypes} from '../../types';
import {colors} from '../../utils';

export default function Currency() {
  const {currency} = useSelector(
    (state: storeTypes.RootState) => state.settings,
  );
  const dispatch = useDispatch();

  function onPress(item: any) {
    dispatch(actions.setting.selectCurrency(item.id));
  }

  // update type for item
  const CheckMark = ({item}: {item?: any}) => {
    if (item.id !== currency) return null;
    return (
      <Pressable>
        <FontAwesome5Icon name="check" size={16} color={colors.primary} />
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
