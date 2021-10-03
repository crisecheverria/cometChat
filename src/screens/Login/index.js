import React from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';
import {Input, Button} from 'react-native-elements';

export default function Login({navigation}) {
  const [data, setData] = React.useState({
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
          placeholder="password"
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={value => setData({password: value})}
          secureTextEntry={true}
        />

        <Button
          title="Sign In"
          loading={false}
          onPress={() => navigation.navigate('Tabs')}
        />
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
