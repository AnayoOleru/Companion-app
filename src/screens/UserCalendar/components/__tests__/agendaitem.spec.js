import React from 'react';
import { shallow } from 'enzyme';
import AgendaItem from '../AgendaItem';
import calendarData from '../../../../../__tests__/mock/calendar.json';

const props = {
  item: calendarData.events['2019-06-05'][0],
  itemsLength: 1
};
const wrapper = shallow(<AgendaItem {...props} />);
describe('Agenda Item', () => {
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
