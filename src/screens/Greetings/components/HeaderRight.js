import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import checkedCalendar from './icons/calendar-checked.png';
import styles from './styles';

const HeaderRight = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} testId="calendar-btn">
    <Image source={checkedCalendar} style={styles.navigationProfileAvatar} />
  </TouchableOpacity>
);

HeaderRight.propTypes = {
  onPress: PropTypes.func.isRequired
};
export default HeaderRight;
