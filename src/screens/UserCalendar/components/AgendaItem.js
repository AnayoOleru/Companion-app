import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Text, Dimensions } from 'react-native';
import { agendaItem as styles } from './agendaStyles';
import { eventDuration } from '../../../utils/helpers';
import { isiPhoneX, responsiveHeight } from '../../../utils/responsiveDimensions';

const { width: DEVICE_WIDTH } = Dimensions.get('window');
const HORIZONTAL_LIST_WIDTH = DEVICE_WIDTH * 0.9;
const ITEM_HEIGHT_FACTOR = isiPhoneX()
  ? responsiveHeight(11.5)
  : responsiveHeight(13);
const TOP_FACTOR = responsiveHeight(12);
const AgendaItem = ({ item, itemsLength }) => {
  const {
    start, end, summary, color
  } = item;
  const itemStyles = [styles.container];
  let duration = eventDuration(start.dateTime, end.dateTime);
  const minutes = new Date(start.dateTime).getMinutes();
  duration = (duration < 25 ? 25 : duration) / 60;
  if (duration) {
    const height = ITEM_HEIGHT_FACTOR * duration;
    const top = TOP_FACTOR * (minutes / 60);
    itemStyles.push({
      marginTop: top,
      height,
      backgroundColor: color.event,
      width: HORIZONTAL_LIST_WIDTH / itemsLength
    });
  }
  return (
    <View style={itemStyles}>
      <Text style={styles.itemTitleText} numberOfLines={1}>
        {summary}
      </Text>
      <Text style={styles.itemHours} numberOfLines={1}>
        {moment(start.dateTime).format('LT')}
        {'-'}
        {moment(end.dateTime).format('LT')}
      </Text>
    </View>
  );
};

AgendaItem.propTypes = {
  item: PropTypes.shape({
    dateTime: PropTypes.string,
    start: PropTypes.shape({
      dateTime: PropTypes.string
    }),
    end: PropTypes.shape({
      dateTime: PropTypes.string
    }),
    summary: PropTypes.string,
    color: PropTypes.shape({ event: PropTypes.string })
  }).isRequired,
  itemsLength: PropTypes.number
};

AgendaItem.defaultProps = {
  itemsLength: 1
};
export default AgendaItem;
