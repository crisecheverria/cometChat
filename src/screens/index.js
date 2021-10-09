import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SignIn from './Login';
import SignUp from './SignUp';
import Chats from './Chats';
import People from './People';
import Profile from './Profile';

import {useAuth} from '../context/AuthContext';
import {CometChat} from '@cometchat-pro/react-native-chat';

const Tab = createBottomTabNavigator();

const Home = () => (
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

const AuthStack = createNativeStackNavigator();

const AuthScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);

const MainStack = createNativeStackNavigator();

const MainScreens = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{headerShown: false}}
    />
    <MainStack.Group screenOptions={{presentation: 'modal'}}>
      <MainStack.Screen
        name="Profile"
        component={Profile}
        options={{title: ''}}
      />
    </MainStack.Group>
  </MainStack.Navigator>
);

const Screens = () => {
  const {auth, dispatchAuth} = useAuth();

  React.useEffect(() => {
    const retrieveUser = async () => {
      try {
        const user = await CometChat.getLoggedinUser();

        if (user) {
          dispatchAuth({
            type: 'RETRIEVE_USER',
            user: {...user},
            isLoggedIn: true,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    retrieveUser();
  }, [dispatchAuth]);

  console.log('<Screens /> auth: ', auth);

  return auth?.isLoggedIn === true ? <MainScreens /> : <AuthScreens />;
};

export default Screens;
