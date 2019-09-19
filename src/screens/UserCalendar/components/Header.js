import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BackButton from '../../../shared/components/Buttons/BackButton';
import HeaderButton from '../OtherCalendar/components/HeaderIconButton';
import Avatar from '../../../shared/components/UserAvatar/Avatar';
import { headerStyles } from './styles';

const Header = ({
  goBack,
  onToggle,
  onSearchPress,
  usersHeaderAvatar,
  isCalendarOpen,
  isModalVisible
}) => {
  const calendarIcon = isCalendarOpen ? 'close' : 'calendar';
  let searchIcon = usersHeaderAvatar.length === 0 ? 'search' : 'searchPlus';
  const searchSize = usersHeaderAvatar.length === 0 ? 18 : 26;
  if (usersHeaderAvatar.length === 0 && isModalVisible) {
    searchIcon = null;
  }
  return (
    <View style={headerStyles.container}>
      <BackButton onPress={goBack} />
      <View style={headerStyles.rightContent}>
        <View style={headerStyles.pinnedUsersContainer}>
          {usersHeaderAvatar.map((avatar, index) => (
            <View key={avatar.userId} style={headerStyles.avatarItem}>
              <Avatar profileAvatar={avatar.imageUrl} colorIndex={index} />
            </View>
          ))}
          <View style={headerStyles.avatarItem}>
            <HeaderButton
              onPress={onSearchPress}
              icon={searchIcon}
              size={searchSize}
              containerStyles={headerStyles.iconContainer}
            />
          </View>
        </View>
        <HeaderButton onPress={onToggle} icon={calendarIcon} />
      </View>
    </View>
  );
};

Header.propTypes = {
  goBack: PropTypes.func.isRequired,
  usersHeaderAvatar: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    })
  ).isRequired,
  isCalendarOpen: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onSearchPress: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool
};
Header.defaultProps = {
  isCalendarOpen: true,
  isModalVisible: false
};
export default Header;
