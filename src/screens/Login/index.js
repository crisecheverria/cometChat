import React from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';
import {Input, Button} from 'react-native-elements';
import {useAuth} from '../../context/AuthContext';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_CONSTANTS} from '../../../CONSTS';

export default function Login({navigation}) {
  const [uid, setUsername] = React.useState('');

  const {dispatchAuth} = useAuth();

  const handleSignIn = async () => {
    CometChat.login(uid, COMETCHAT_CONSTANTS.AUTH_KEY).then(
      user => {
        console.log('User is logged in: ', user);
        dispatchAuth({type: 'LOGIN', user: {...user}, isLoggedIn: true});
      },
      error => {
        console.log('error on login: ', error);
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.body}>
        <Input
          placeholder="username"
          leftIcon={{type: 'font-awesome', name: 'user'}}
          onChangeText={value => setUsername(value)}
        />

        <Button title="Sign In" loading={false} onPress={handleSignIn} />
        <Button
          title="Sign Up"
          type="outline"
          style={styles.mt10}
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
}
