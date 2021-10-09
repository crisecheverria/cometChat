import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import AvatarImage from '../../components/AvatarImage';
import {styles} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import ChatMessage from '../../components/ChatMessage';
import {useAuth} from '../../context/AuthContext';
import InputMessage from '../../components/InputMessage';
import {CometChat} from '@cometchat-pro/react-native-chat';

const msgListenerId = 'incoming_message_' + new Date().getTime();
const limit = 30;

function ChatMessage({message, uid}) {
  const isMyMessage = () => {
    return message?.sender?.uid === uid;
  };

  console.log('ChatMessage: ', message);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}>
        {!isMyMessage() && (
          <Text style={styles.name}>{message?.sender?.name}</Text>
        )}
        <Text style={styles.message}>{message?.text}</Text>
        {/* <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text> */}
      </View>
    </View>
  );
}

export default function Chat({navigation, route}) {
  const {avatar, name, uid, lastActiveAt} = route.params;
  const {auth} = useAuth();
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: ({color, size = 26}) => (
        <>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={color}
              size={size}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <AvatarImage avatar={avatar} style={styles.ml10} />
          </TouchableOpacity>
          <Text style={styles.headerName}>{name}</Text>
        </>
      ),
    });
  }, [navigation, avatar, name]);

  React.useEffect(() => {
    CometChat.addMessageListener(
      msgListenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
          console.log('Text message received successfully', textMessage);
          // Handle text message
          setMessages(prev => [...prev, textMessage]);
        },
        onMediaMessageReceived: mediaMessage => {
          console.log('Media message received successfully', mediaMessage);
          // Handle media message
        },
        onCustomMessageReceived: customMessage => {
          console.log('Custom message received successfully', customMessage);
          // Handle custom message
        },
      }),
    );

    return () => {
      CometChat.removeMessageListener(msgListenerId);
    };
  }, []);

  React.useEffect(() => {
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(uid)
      .setLimit(limit)
      .build();

    messagesRequest.fetchPrevious().then(
      prevMessages => {
        console.log('Message list fetched:', prevMessages);
        setMessages(prevMessages);
      },
      error => {
        console.log('Message fetching failed with error:', error);
      },
    );
  }, [uid]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <ChatMessage uid={auth?.user?.uid} message={item} />
        )}
        inverted
      />

      <InputMessage receiverUid={uid} />
    </View>
  );
}
