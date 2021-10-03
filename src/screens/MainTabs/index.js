import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Chats from '../Chats';
import People from '../People';

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator screenOptions={{tabBarActiveTintColor: 'blue'}}>
    <Tab.Screen
      name="Chats"
      component={Chats}
      options={{
        tabBarLabel: 'Chats',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="comment" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="People"
      component={People}
      options={{
        tabBarLabel: 'People',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons
            name="account-multiple"
            color={color}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabs;
