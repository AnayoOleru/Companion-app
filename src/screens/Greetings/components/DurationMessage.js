import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const DurationMessage = ({
  onDurationPress, isAccepted, duration, isSelected
}) => {
  const primaryColor = isSelected === duration ? '#FFFFFF' : '#0459E4';
  const backgroundColor = isSelected === duration ? '#0459E4' : '#ECF1FA';
  return (
    <TouchableWithoutFeedback
      onPress={() => onDurationPress(duration)}
      disabled={!!isAccepted}
    >
      <View style={[styles.eventDurationMessage, { backgroundColor }]}>
        <Text style={[styles.eventDurationMessageText, { color: primaryColor }]}>
          {duration}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

DurationMessage.propTypes = {
  onDurationPress: PropTypes.func.isRequired,
  duration: PropTypes.string.isRequired,
  isAccepted: PropTypes.bool.isRequired,
  isSelected: PropTypes.string.isRequired
};

export default DurationMessage;
