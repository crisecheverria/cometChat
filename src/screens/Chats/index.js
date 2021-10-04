import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {Button} from 'react-native-elements';
import {useAuth} from '../../context/AuthContext';

export default function Chats() {
  const {dispatchAuth} = useAuth();
  const handleLogout = () => {
    CometChat.logout().then(
      () => {
        console.log('Logout completed successfully');
        dispatchAuth({type: 'LOGOUT'});
      },
      //Logout completed successfully
      error => {
        //Logout failed with exception
        console.log('Logout failed with exception:', {error});
      },
    );
  };
  return (
    <View style={styles.container}>
      <Text>Chats</Text>
      <Button title="Log out" loading={false} onPress={handleLogout} />
    </View>
  );
}
