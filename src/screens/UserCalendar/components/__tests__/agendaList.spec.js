import React from 'react';
import Renderer from 'react-test-renderer';
import AgendaList from '../AgendaList';
import { formatDate } from '../../../../utils/helpers';

jest.useFakeTimers();
const props = {
  currentEvents: [],
  isLoading: false,
  currentDate: formatDate(new Date())
};
const wrapper = Renderer.create(<AgendaList {...props} />);
const testInstance = wrapper.root;
describe('User AgendaList Component', () => {
  let instance;
  let scrollView;
  beforeEach(() => {
    scrollView = testInstance.findByProps({
      testId: 'scroll-view'
    });
    instance = wrapper.getInstance();
    jest.spyOn(instance, 'toCurrentTime');
    jest.spyOn(instance, 'componentReady');
    instance.forceUpdate();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should respond on size change', () => {
    scrollView.props.onContentSizeChange();
    expect(instance.toCurrentTime).toBeCalled();
    expect(instance.componentReady).not.toBeCalled();
  });

  test('should render component', () => {
    const otherProps = {
      ...props,
      currentDate: '09-09-2013'
    };
    wrapper.update(<AgendaList {...otherProps} />);
    scrollView.props.onContentSizeChange();
    expect(instance.toCurrentTime).toBeCalled();
    expect(instance.componentReady).toBeCalled();
  });
});
