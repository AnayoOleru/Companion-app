import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const HeaderLeft = ({ onPress, profileAvatar }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={profileAvatar ? { uri: profileAvatar } : null}
      style={styles.navigationProfileAvatar}
    />
  </TouchableOpacity>
);

HeaderLeft.propTypes = {
  profileAvatar: PropTypes.string,
  onPress: PropTypes.func
};

HeaderLeft.defaultProps = {
  profileAvatar: '',
  onPress: () => {}
};

export default HeaderLeft;
