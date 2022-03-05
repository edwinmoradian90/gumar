import React, {useState, useLayoutEffect} from 'react';
import Home from './src/views/Home';
import Splash from './src/views/Splash';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {muted, primary, secondary, white} from './src/utils/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Edit from './src/views/Edit';
import Layout from './src/views/Layout';
import Settings from './src/views/settings/Settings';
import Setting from './src/views/settings/Setting';
import Export from './src/components/Export';

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

  const SettingsScreen = createScreen(Settings);

  const SettingScreen = createScreen(Setting);

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
        activeColor={secondary}
        inactiveColor={muted}
        barStyle={{
          backgroundColor: primary,
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
