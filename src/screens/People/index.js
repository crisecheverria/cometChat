import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {ButtonGroup, ListItem, Avatar, Badge} from 'react-native-elements';
import {useAuth} from '../../context/AuthContext';
import AvatarImage from '../../components/AvatarImage';

const ListUsers = ({avatar, name}) => (
  <ListItem key={avatar} bottomDivider>
    <Avatar rounded source={{uri: avatar}} />
    <ListItem.Content>
      <ListItem.Title>{name}</ListItem.Title>
    </ListItem.Content>
  </ListItem>
);

export default function People({navigation}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [users, setUsers] = React.useState([]);

  const {auth} = useAuth();

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <AvatarImage avatar={auth?.user?.avatar} style={styles.ml10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, auth]);

  React.useEffect(() => {
    let usersRequest = new CometChat.UsersRequestBuilder().setLimit(5).build();

    usersRequest.fetchNext().then(
      userList => {
        /* userList will be the list of User class. */
        console.log('User list received:', userList);
        if (userList) {
          setUsers(userList);
        }
        /* retrived list can be used to display contact list. */
      },
      error => {
        console.log('User list fetching failed with error:', error);
      },
    );
  }, []);

  const ActiveUsers = () => {
    const count = users.filter(({status}) => status === 'online').length;
    return (
      <Text>
        Active <Badge value={count} status="primary" />
      </Text>
    );
  };
  const InactiveUsers = () => <Text>Inactive</Text>;
  const buttons = [{element: ActiveUsers}, {element: InactiveUsers}];

  console.log('Active Users: ', users);

  return (
    <View style={styles.container}>
      <ButtonGroup
        onPress={index => setSelectedIndex(index)}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={styles.buttonGroupContainer}
        selectedButtonStyle={styles.selectedButtonGroup}
      />

      <View style={styles.body}>
        {selectedIndex === 0 &&
          users
            .filter(({status}) => status === 'online')
            .map(user => <ListUsers {...user} />)}

        {selectedIndex === 1 &&
          users
            .filter(({status}) => status === 'offline')
            .map(user => <ListUsers {...user} />)}
      </View>
    </View>
  );
}
