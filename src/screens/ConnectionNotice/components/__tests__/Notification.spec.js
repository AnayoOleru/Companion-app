import React from 'react';
import { shallow } from 'enzyme';
import Notification from '../Notification';
import screenshotsHandler from '../../../../../__tests__/helpers/screenshotsHandler';

describe('Notification', () => {
  const wrapper = shallow(<Notification />);
  screenshotsHandler(wrapper, 'renders correctly');
});
