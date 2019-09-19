import React from 'react';

import { InputToolbar } from 'react-native-gifted-chat';
import styles from './styles';

const InputBox = props => (
  <InputToolbar
    {...props}
    placeholder="Type something ..."
    primaryStyle={styles.inputPrimary}
    containerStyle={styles.inputToolBar}
    textInputStyle={styles.inputBoxText}
  />
);

export default InputBox;
