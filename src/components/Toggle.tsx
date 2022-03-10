import React from 'react';
import {Switch, View, StyleSheet} from 'react-native';
import {colors} from '../utils';

export default function Toggle({
  isEnabled = false,
  toggleSwitch = () => {},
}: {
  isEnabled: boolean;
  toggleSwitch: () => void;
}) {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: colors.muted, true: colors.secondary}}
        thumbColor={colors.gray}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
