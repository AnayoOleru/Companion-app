import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';
import options from '../../../constants/initialMessage';

import styles from './styles';

const MenuOptions = ({ onPress }) => (
  <View style={styles.menuContainer}>
    {options.map(option => (
      <View key={`${option.itemDescription}`}>
        <MenuItem {...option} onPress={onPress} />
      </View>
    ))}
  </View>
);

MenuOptions.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default MenuOptions;
