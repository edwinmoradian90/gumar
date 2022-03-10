import React, {useState, useLayoutEffect} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Edit, Home, Layout, Settings, Splash} from './src/views';
import {Export} from './src/components';
import {colors} from './src/utils';

let count = 0;

export default function App() {
  const [isSplash, setIsSplash] = useState(true);

  useLayoutEffect(() => {
    if (!isSplash) return;
    setTimeout(() => {
      setIsSplash(false);
    }, 3000);
  }, []);

  count += 1;

  console.log('APP renders ', count);

  const Tab = createMaterialBottomTabNavigator();
  const HomeStack = createNativeStackNavigator();
  const SettingsStack = createNativeStackNavigator();
  const ExportStack = createNativeStackNavigator();

  function createScreen(
    Component:
      | React.FunctionComponent
      | React.MemoExoticComponent<React.FunctionComponent>,
  ) {
    return function () {
      return (
        <Layout>
          <Component />
        </Layout>
      );
    };
  }

  const HomeScreen = createScreen(Home);

  const EditScreen = createScreen(Edit);

  const SettingsScreen = createScreen(Settings.Settings);

  const SettingScreen = createScreen(Settings.Setting);

  const ExportScreen = createScreen(Export);

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

  function ExportScreenStack() {
    return (
      <ExportStack.Navigator screenOptions={{headerShown: false}}>
        <ExportStack.Screen name="ExportScreen" component={ExportScreen} />
      </ExportStack.Navigator>
    );
  }

  if (isSplash) return <Splash />;

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
          component={ExportScreenStack}
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
