import React from 'react';
import { Send } from 'react-native-gifted-chat';
import { Image } from 'react-native';
import sendIcon from '../../../assets/icons/send.png';
import styles from './styles';

const RenderSend = props => (
  <Send {...props} containerStyle={styles.sendIconContainer}>
    <Image source={sendIcon} style={styles.sendIcon} />
  </Send>
);

export default RenderSend;
