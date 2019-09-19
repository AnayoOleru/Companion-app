import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';

const LogoutButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.logoutButton}>
      <Text style={styles.logoutButtonText}>LOGOUT</Text>
    </View>
  </TouchableOpacity>
);

LogoutButton.propTypes = {
  onPress: PropTypes.func
};

LogoutButton.defaultProps = {
  onPress: () => {}
};

export default LogoutButton;
