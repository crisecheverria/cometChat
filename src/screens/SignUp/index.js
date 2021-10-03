import React from 'react';
import {View, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {styles} from './styles';

export default function SignUp() {
  const [data, setData] = React.useState({
    email: '',
    name: '',
    username: '',
    password: '',
  });
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
          onChangeText={value => setData({username: value})}
        />
        <Input
          placeholder="name"
          leftIcon={{type: 'font-awesome', name: 'user'}}
          onChangeText={value => setData({name: value})}
        />
        <Input
          placeholder="email"
          leftIcon={{type: 'font-awesome', name: 'user'}}
          onChangeText={value => setData({email: value})}
        />
        <Input
          placeholder="password"
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={value => setData({password: value})}
          secureTextEntry={true}
        />

        <Button title="Sign Up" loading={false} />
      </View>
    </View>
  );
}
