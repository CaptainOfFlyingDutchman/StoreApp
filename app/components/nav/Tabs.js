import React from 'react';
import { TabNavigator } from 'react-navigation';

import Home from '../Home';
import History from '../History';
import Sync from '../Sync';

const Tabs = TabNavigator({
  Home: {
    screen: Home
  },
  History: {
    screen: History
  },
  Sync: {
    screen: Sync
  }
}, {
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    labelStyle: {
      fontSize: 18,
      color: 'gray'
    },
    style: {
      backgroundColor: 'white'
    },
    showIcon: true,
    activeBackgroundColor: 'blue'
  }
});

export default Tabs;
