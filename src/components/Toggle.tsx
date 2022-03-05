import React from 'react';
import {Switch, View, StyleSheet} from 'react-native';
import {gray, muted, primary} from '../utils/colors';

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
        trackColor={{false: muted, true: primary}}
        thumbColor={gray}
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
