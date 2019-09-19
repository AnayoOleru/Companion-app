import React from 'react';
import { shallow } from 'enzyme';
import ExpandableCalendar from '../ExpandableCalendar';
import screenshotHandler from '../../../../../__tests__/helpers/screenshotsHandler';

const props = {
  selected: '2019-07-09',
  dots: {}
};
const wrapper = shallow(<ExpandableCalendar {...props} />);

describe('User Calendar Component', () => {
  describe('Component Render', () => {
    screenshotHandler(wrapper);
  });
});
