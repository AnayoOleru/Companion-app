import React from 'react';
import { shallow } from 'enzyme';
import SearchInput from '../SearchInput';

const props = {
  value: '',
  onTextChange: jest.fn()
};
const wrapper = shallow(<SearchInput {...props} />);

describe('Search Input Component ', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should should respond to text input change', () => {
    const input = wrapper.find(`[testID="text-input"]`);
    input.props().onChangeText();
    expect(props.onTextChange).toBeCalled();
  });
});
