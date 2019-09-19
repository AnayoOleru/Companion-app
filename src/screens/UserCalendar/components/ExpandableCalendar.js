import React from 'react';
import PropTypes from 'prop-types';
import { ExpandableCalendar as ExpCalendar } from 'react-native-calendars';
import calendarSettings from '../../../constants/calendarSettings';

const ExpandableCalendar = ({ dots, selected }) => (
  <ExpCalendar
    firstDay={1}
    initialPosition="open"
    monthFormat="MMMM"
    markingType="multi-dot"
    scrollEnabled={false}
    markedDates={{
      ...dots,
      [selected]: {
        selected: true,
        ...calendarSettings.selected
      }
    }}
    theme={calendarSettings.theme}
  />
);

ExpandableCalendar.propTypes = {
  dots: PropTypes.shape({}).isRequired,
  selected: PropTypes.string.isRequired
};
export default ExpandableCalendar;
