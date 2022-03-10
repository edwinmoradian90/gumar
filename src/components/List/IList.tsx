import React, {ReactElement} from 'react';
import {View} from 'react-native';
import uuid from 'react-native-uuid';

export default function IList({
  data,
  children: ListItemComponent,
  filter = () => true,
}: {
  data: any;
  children?: React.ReactNode;
  filter?: (item: any) => boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
      }}>
      {data &&
        data.length > 0 &&
        data
          .filter((listItemData: any) => filter(listItemData))
          .map((listItemData: any) => {
            const key: string | number[] = uuid.v4();
            return (
              <React.Fragment key={key as string}>
                {React.cloneElement(ListItemComponent as ReactElement<any>, {
                  listItemData,
                })}
              </React.Fragment>
            );
          })}
    </View>
  );
}
