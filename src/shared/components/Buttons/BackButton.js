import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import BackIcon from '../../../assets/back.png';
import {
  widthPercentageToDP
} from '../../styles/responsiveStyles';

const styles = StyleSheet.create({
  icon: {
    width: widthPercentageToDP(4),
    height: undefined,
    aspectRatio: 1 / 1,
    padding: scale(5),
    marginHorizontal: scale(15)
  }
});
const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={BackIcon} style={styles.icon} />
  </TouchableOpacity>
);

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired
};
export default BackButton;
