import React from 'react';
import { Avatar } from 'react-native-gifted-chat';
import styles from './styles';

const UserAvatar = (props) => {
  const avatarProps = props;
  return (
    <Avatar
      {...avatarProps}
      position="right"
      imageStyle={{ right: [styles.conversationAvatar] }}
    />
  );
};

export default UserAvatar;
