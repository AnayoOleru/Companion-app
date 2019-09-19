import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const SaveAttendeeButton = ({ action }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={action}>
      <Text style={[styles.countText]}> Add Attendees </Text>
    </TouchableOpacity>
  </View>
);

SaveAttendeeButton.propTypes = {
  action: PropTypes.func.isRequired
};

export default SaveAttendeeButton;
