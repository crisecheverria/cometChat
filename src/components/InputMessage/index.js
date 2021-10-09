import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CometChat} from '@cometchat-pro/react-native-chat';

export default function InputMessage({receiverUid}) {
  const [message, setMessage] = React.useState('');

  const onMicrophonePress = () => {
    console.warn('Microphone');
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      const textMessage = new CometChat.TextMessage(
        receiverUid,
        message,
        CometChat.RECEIVER_TYPE.USER,
      );

      CometChat.sendMessage(textMessage).then(
        msg => {
          console.log('Message sent successfully:', msg);
        },
        error => {
          console.log('Message sending failed with error:', error);
        },
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={{width: '100%'}}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {/* <FontAwesome name="plus" size={24} color="grey" /> */}
          <Input
            placeholder="Aa"
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <MaterialCommunityIcons name="send" size={26} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
