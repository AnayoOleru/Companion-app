import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';

const props = {
  size: 'small',
  color: '#000'
};
const component = shallow(<Loading {...props} />);

describe('Loading Component', () => {
  test('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
