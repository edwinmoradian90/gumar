import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {white} from '../utils/colors';

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
    backgroundColor: white,
    borderRadius: 5,
    margin: 10,
    padding: 20,
  },
});
