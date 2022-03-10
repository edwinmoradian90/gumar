import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {colors} from '../utils';

export default function Card({
  children,
  style,
  onPress,
}: {
  children?: React.ReactNode;
  style?: any;
  onPress?: () => void;
}) {
  const cardStyle = style ? {...styles.card, ...style} : styles.card;
  return (
    <Pressable style={cardStyle} onPress={onPress}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 10,
    padding: 20,
  },
});
