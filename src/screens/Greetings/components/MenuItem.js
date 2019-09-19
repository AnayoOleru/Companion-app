import React from 'react';
import {
  Text, View, Image, TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const MenuItem = ({
  itemDescription,
  itemIcon,
  itemColor,
  textColor,
  onPress
}) => (
  <TouchableWithoutFeedback onPress={() => onPress(itemDescription)}>
    <View style={[styles.menuItem, { backgroundColor: itemColor }]}>
      <Image source={itemIcon} style={styles.menuItemImage} />
      <Text style={[styles.menuItemText, { color: textColor }]}>
        {itemDescription}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

MenuItem.propTypes = {
  itemDescription: PropTypes.string,
  itemIcon: PropTypes.number,
  itemColor: PropTypes.string,
  textColor: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

MenuItem.defaultProps = {
  itemDescription: null,
  itemIcon: null,
  itemColor: null,
  textColor: null
};

export default MenuItem;
