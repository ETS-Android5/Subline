import React from 'react';
import {createStackNavigator} from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './components/Views/HomePage';
import SearchPage from './components/Views/SearchPage';
import MapPage from './components/Views/MapPage';

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

export const RootStack = createStackNavigator(
  {
    HomePage: { screen: HomePage },
    SearchPage: { screen: SearchPage },
    MapPage: { screen: MapPage },
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none'
  }
);

