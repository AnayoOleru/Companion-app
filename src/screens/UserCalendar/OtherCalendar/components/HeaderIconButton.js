import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import SearchPlus from '../../../../assets/ic_search.png';
import CloseIcon from '../../../../assets/close.png';
import CalendarIcon from '../../../../assets/calendar.png';
import SearchIcon from '../../../../assets/loupe.png';
import { addEventStyles } from '../../components/styles';

const icons = {
  search: SearchIcon,
  searchPlus: SearchPlus,
  close: CloseIcon,
  calendar: CalendarIcon
};
const HeaderIconButton = ({
  onPress,
  icon = 'searchPlus',
  containerStyles
}) => {
  const iconStyles = [addEventStyles.addEventsIcon];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[addEventStyles.addEventsButton, containerStyles]}>
        <Image source={icons[icon]} style={iconStyles} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};

HeaderIconButton.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  containerStyles: PropTypes.shape({})
};

HeaderIconButton.defaultProps = {
  icon: 'searchPlus',
  containerStyles: {}
};
export default HeaderIconButton;
