import React, {Key} from 'react';
import uuid from 'react-native-uuid';
import {FlatList, Text, View, TouchableHighlight} from 'react-native';
import {useSelector} from 'react-redux';
import {appTypes, storeTypes, transactionTypes} from '../types';
import {style} from '../styles';

export default function List({
  data,
  onPress = () => {},
  onLongPress = () => {},
  exclude,
  include,
  styles = style.list.main,
  reverse = false,
  scrollable = true,
  before,
  after,
  hide,
  children,
}: {
  // update type
  data: any;
  onPress?: (item: transactionTypes.Transaction) => void;
  onLongPress?: (item: transactionTypes.Transaction) => void;
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
  const {status} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );

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
    item: transactionTypes.Transaction;
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
      <View key={key}>
        <Item
          item={item}
          onPress={() => onPress(item)}
          onLongPress={() => onLongPress(item)}
        />
      </View>
    );
  };

  console.log({data});

  return (
    <View style={listContainer}>
      {status === appTypes.Status.SUCCESS &&
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
