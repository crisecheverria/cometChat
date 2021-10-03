import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../Login';
import SignUp from '../SignUp';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SignIn" component={SignIn} />
    <RootStack.Screen name="SignUp" component={SignUp} />
  </RootStack.Navigator>
);

export default RootStackScreen;
