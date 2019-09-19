import React from 'react';
import Renderer from 'react-test-renderer';
import TimeIndictor from '../TimeIndictor';

jest.useFakeTimers();

describe('TimeIndictor Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = Renderer.create(<TimeIndictor />);
  });
  afterEach(() => {
    jest.clearAllTimers();
  });
  test('should render time indictor component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should get current time', () => {
    jest.runOnlyPendingTimers();
    expect(setInterval).toBeCalled();
  });
});
