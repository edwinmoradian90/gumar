import React from 'react';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../utils';

export default function Rectangle({children}: {children?: React.ReactNode}) {
  return (
    <View
      style={{
        flex: 1,
        margin: 20,
        marginTop: 20,
      }}>
      <Svg
        height="100%"
        width="100%"
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: 0.9,
        }}>
        <Defs>
          <LinearGradient id="grad" x1="30%" y1="20%" x2="90%" y2="90%">
            <Stop offset="0" stopColor={colors.accent} />
            <Stop offset="1" stopColor={colors.secondary} />
          </LinearGradient>
        </Defs>
        <Rect ry={10} width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      {children}
    </View>
  );
}
