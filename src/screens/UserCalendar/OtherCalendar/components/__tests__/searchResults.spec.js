import React from 'react';
import Renderer from 'react-test-renderer';
import SearchResults from '../SearchResults';
import { user } from '../../../../../../__tests__/mock/data';

const props = {
  data: [user],
  pinUser: jest.fn()
};
const wrapper = Renderer.create(<SearchResults {...props} />);
const testInstance = wrapper.root;
describe('Search Input Component ', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should respond on pin user', () => {
    const listItem = testInstance.findByProps({ testId: 'single-user' });
    listItem.props.onPress();
    expect(listItem).toBeTruthy();
    expect(props.pinUser).toBeCalled();
  });
});
