import React from 'react';
import {Avatar} from 'react-native-elements';

export default function AvatarImage({avatar, style, size = 'small'}) {
  return (
    <Avatar
      rounded
      source={{
        uri: `${avatar}.jpg`,
      }}
      containerStyle={style}
      size={size}
    />
  );
}
