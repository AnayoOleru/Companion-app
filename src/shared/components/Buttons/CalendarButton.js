import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import CalendarIcon from '../../../assets/calendar.png';
import CloseIcon from '../../../assets/close.png';

const styles = StyleSheet.create({
  icon: {
    width: scale(28),
    marginBottom: scale(5),
    height: undefined,
    aspectRatio: 1 / 1,
    marginLeft: scale(5)
  }
});
const CalendarButton = ({ onPress, closeIcon }) => {
  const icon = closeIcon ? CloseIcon : CalendarIcon;
  return (
    <TouchableOpacity onPress={onPress} testId="calendar-btn">
      <Image source={icon} style={styles.icon} resizeMode="cover" />
    </TouchableOpacity>
  );
};
CalendarButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  closeIcon: PropTypes.bool
};
CalendarButton.defaultProps = {
  closeIcon: true
};
export default CalendarButton;
