import React from 'react';
import uuid from 'react-native-uuid';
import {Dimensions, Text, View} from 'react-native';
import useHeaderActions from '../hooks/useHeaderActions';
import {Buttons} from '.';
import {helpers} from '../utils';
import {style} from '../styles';

export default function Header({
  title,
  left = [],
  right = [],
  center = [],
  actions = {},
  styles = style.header.main,
}: {
  title?: string;
  left?: string[];
  right?: string[];
  center?: string[];
  actions?: {[index: string]: (...args: any) => void};
  styles?: any;
}) {
  const headerActions = useHeaderActions();

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
      const capitalizedName = helpers.capitalize(name);
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
