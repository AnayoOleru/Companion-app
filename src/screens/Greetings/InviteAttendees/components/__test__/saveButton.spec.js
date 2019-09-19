import React from 'react';
import { shallow } from 'enzyme';
import Button from '../SaveAttendeeButton';
import screenshotHandler
  from '../../../../../../__tests__/helpers/screenshotsHandler';

const componentWrapper = shallow(<Button />);

describe('SaveAttendeesButton', () => {
  describe('Component rendering', () => {
    screenshotHandler(componentWrapper);
  });
});
