import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {Button} from 'react-native-elements';
import {useAuth} from '../../context/AuthContext';
import AvatarImage from '../../components/AvatarImage';
import {ListItem, Icon} from 'react-native-elements';

export default function Profile({navigation}) {
  const {auth, dispatchAuth} = useAuth();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = () => {
    CometChat.logout().then(
      () => {
        console.log('Logout completed successfully');
        dispatchAuth({type: 'LOGOUT'});
      },

      error => {
        console.log('Logout failed with exception:', {error});
        dispatchAuth({
          type: 'AUTH_FAILED',
          error: error.message,
          isLoggedIn: auth.isLoggedIn,
        });
      },
    );
  };

  const items = [
    {
      title: 'Role',
      value: auth?.user?.role,
      icon: 'person',
      chevron: false,
    },
    {
      title: 'Status',
      value: auth?.user?.status,
      icon: 'accessibility',
      chevron: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AvatarImage avatar={auth?.user?.avatar} size="large" />
        <Text style={styles.profileNameText}>{auth?.user?.name}</Text>
      </View>
      <View style={styles.body}>
        {items.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>
                {item.title}: {item.value}
              </ListItem.Title>
            </ListItem.Content>
            {item.chevron && <ListItem.Chevron />}
          </ListItem>
        ))}
        <Button title="Log out" loading={false} onPress={handleLogout} />
      </View>
    </View>
  );
}
