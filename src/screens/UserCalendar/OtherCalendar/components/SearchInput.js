import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addCalendarStyles } from '../../components/agendaStyles';

const SearchInput = ({ onTextChange, value }) => (
  <View style={addCalendarStyles.searchBoxContainer}>
    <TextInput
      style={addCalendarStyles.searchInput}
      placeholder="Search for attendees…"
      onChangeText={textValue => onTextChange(textValue)}
      value={value}
      autoCapitalize="none"
      testID="text-input"
    />
    <Ionicons name="ios-search" size={28} color="#4D6EFF" />
  </View>
);

SearchInput.propTypes = {
  onTextChange: PropTypes.func,
  value: PropTypes.string.isRequired
};

SearchInput.defaultProps = {
  onTextChange: () => {}
};
export default SearchInput;
