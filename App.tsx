import React, {useState, useLayoutEffect, useEffect, useMemo} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as View from './src/views';
import {colors} from './src/utils';
import {appTypes} from './src/types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
  const SubscriptionsStack = createNativeStackNavigator();
  const TransactionsStack = createNativeStackNavigator();

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
  const TransactionsScreen = createScreen(View.Transactions);
  const SubscriptionsScreen = createScreen(View.Subscriptions);

  function HomeScreenStack() {
    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="EditScreen" component={EditScreen} />
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

  function TransactionsScreenStack() {
    return (
      <TransactionsStack.Navigator screenOptions={{headerShown: false}}>
        <TransactionsStack.Screen
          name="TransactionsScreen"
          component={TransactionsScreen}
        />
      </TransactionsStack.Navigator>
    );
  }

  function SubscriptionsScreenStack() {
    return (
      <SubscriptionsStack.Navigator screenOptions={{headerShown: false}}>
        <SubscriptionsStack.Screen
          name="SubscriptionsScreen"
          component={SubscriptionsScreen}
        />
      </SubscriptionsStack.Navigator>
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
          name="Transactions"
          component={TransactionsScreenStack}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcon
                name="chart-timeline-variant-shimmer"
                size={21}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Subscriptions"
          component={SubscriptionsScreenStack}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcon
                name="repeat-variant"
                size={21}
                color={color}
              />
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
