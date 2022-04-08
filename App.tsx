import React, {useState, useLayoutEffect, useEffect, useMemo} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as View from './src/views';
import {colors} from './src/utils';
import {appTypes} from './src/types';

export default function App() {
  const [isSplash, setIsSplash] = useState(true);

  useLayoutEffect(() => {
    if (!isSplash) return;
    setTimeout(() => {
      setIsSplash(false);
    }, 3000);
  }, []);

  const Tab = createMaterialBottomTabNavigator();
  const HomeStack = createNativeStackNavigator();
  const SettingsStack = createNativeStackNavigator();
  const StatsStack = createNativeStackNavigator();

  function createScreen(
    Component:
      | React.FunctionComponent
      | React.MemoExoticComponent<React.FunctionComponent>,
  ) {
    return function () {
      return (
        <View.Layout>
          <Component />
        </View.Layout>
      );
    };
  }

  const HomeScreen = createScreen(View.Home);
  const EditScreen = createScreen(View.Edit);
  const SettingsScreen = createScreen(View.Settings.Settings);
  const SettingScreen = createScreen(View.Settings.Setting);
  const TransactionsScreen: React.FC<appTypes.TransactionsScreenProp> =
    createScreen(View.Transactions);
  const StatsScreen = createScreen(View.Stats);

  function HomeScreenStack() {
    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="EditScreen" component={EditScreen} />
        <HomeStack.Screen
          name="TransactionsScreen"
          component={TransactionsScreen}
        />
      </HomeStack.Navigator>
    );
  }

  function SettingsScreenStack() {
    return (
      <SettingsStack.Navigator screenOptions={{headerShown: false}}>
        <SettingsStack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
        />
        <SettingsStack.Screen name="SettingScreen" component={SettingScreen} />
      </SettingsStack.Navigator>
    );
  }

  function StatsScreenStack() {
    return (
      <StatsStack.Navigator screenOptions={{headerShown: false}}>
        <StatsStack.Screen name="StatsScreen" component={StatsScreen} />
      </StatsStack.Navigator>
    );
  }

  if (isSplash) return <View.Splash />;

  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor={colors.secondary}
        inactiveColor={colors.muted}
        barStyle={{
          backgroundColor: colors.primary,
          elevation: 0,
          shadowColor: 'transparent',
        }}>
        <Tab.Screen
          name="Overview"
          component={HomeScreenStack}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcon name="home-roof" size={21} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreenStack}
          options={{
            tabBarIcon: ({color}) => (
              <IonIcon name="md-analytics-outline" size={21} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreenStack}
          options={{
            tabBarIcon: ({color}) => (
              <IonIcon name="options-outline" size={21} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
