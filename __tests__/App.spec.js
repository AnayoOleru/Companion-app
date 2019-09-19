import React from 'react';
import { shallow } from 'enzyme';
import App from '../src';
import screenshotHandler from './helpers/screenshotsHandler';

const props = {
  navigation: {
    navigate: jest.fn()
  }
};
describe('<App />', () => {
  const tree = shallow(<App {...props} />);
  screenshotHandler(tree, 'should render correctly');
});
