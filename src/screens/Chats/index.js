import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

import {useAuth} from '../../context/AuthContext';
import AvatarImage from '../../components/AvatarImage';

export default function Chats({navigation}) {
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

  return (
    <View style={styles.container}>
      <Text>Chats</Text>
    </View>
  );
}
