import React, {Key} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Animated, {SlideInUp, SlideOutUp} from 'react-native-reanimated';
import uuid from 'react-native-uuid';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/types/store';
import listStyles from '../styles/list/main';
import {Transaction} from '../types/app';
import {Status} from '../types/app';

export default function List({
  data,
  onPress = () => {},
  onLongPress = () => {},
  exclude,
  include,
  styles = listStyles,
  reverse = false,
  scrollable = true,
  before,
  after,
  hide,
  children,
}: {
  // update type
  data: any;
  onPress?: (item: Transaction) => void;
  onLongPress?: (item: Transaction) => void;
  exclude?: string[];
  include?: string[];
  styles?: any;
  reverse?: boolean;
  scrollable?: boolean;
  before?: {[index: string]: any};
  after?: {[index: string]: any};
  hide?: string[] | null;
  children?: React.ReactNode;
}) {
  const {status} = useSelector((state: RootState) => state.transaction);

  const {
    listItemContainer,
    listItemBody,
    listItemText,
    listItemTextContainer,
    listContainer,
    defaultPalette,
  } = styles || {};

  const {underlayColor} = defaultPalette || {};

  const Item = ({
    item,
    onPress,
    onLongPress,
  }: {
    item: Transaction;
    onPress: () => void;
    onLongPress: () => void;
  }) => {
    return (
      <TouchableHighlight
        style={listItemContainer}
        onPress={onPress}
        onLongPress={onLongPress}
        underlayColor={underlayColor}>
        <View style={listItemBody}>
          <View style={listItemTextContainer}>
            {item &&
              Object.keys(item)
                .filter((key: string) => {
                  return (
                    (exclude &&
                      exclude.length > 0 &&
                      exclude.indexOf(key) < 0) ||
                    (include && include.length > 0 && include.indexOf(key) > -1)
                  );
                })
                .map((key: string, index) => {
                  const id = uuid.v4() as Key;
                  const data: string = item[key].toString();
                  const additionalStyleKey = `listItemText${index + 1}`;
                  const textStyle = styles[additionalStyleKey];

                  return (
                    <Text key={id} style={{...listItemText, ...textStyle}}>
                      {before && key === before.key && before.value}
                      {data}
                      {after && key === after.key && after.value}
                    </Text>
                  );
                })}
          </View>
          {children &&
            React.Children.map(children, (child: React.ReactNode) =>
              React.cloneElement(child as React.ReactElement<any>, {item}),
            )}
        </View>
      </TouchableHighlight>
    );
  };
  const renderItem = ({item, index}: {item: any; index: number}) => {
    const key = uuid.v4() as string;
    if (hide && hide.length > 0 && hide.includes(item.id)) return null;
    return (
      <Animated.View key={key} entering={SlideInUp}>
        <Item
          item={item}
          onPress={() => onPress(item)}
          onLongPress={() => onLongPress(item)}
        />
      </Animated.View>
    );
  };

  return (
    <View style={listContainer}>
      {status === Status.SUCCESS &&
        data &&
        data.length > 0 &&
        (scrollable ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          data.map((item: any, index: number) => renderItem({item, index}))
        ))}
    </View>
  );
}
