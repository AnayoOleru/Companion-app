import React from 'react';
import { AsyncStorage } from 'react-native';
import { Asset } from 'expo-asset';
import { shallow } from 'enzyme';
import { Home } from '../../src/screens/Home';
import navProps from '../helpers/navigationProps';

jest.mock('expo-font');

jest.spyOn(Asset, 'fromModule').mockImplementation(() => ({
  fromModule: jest.fn(),
  downloadAsync: jest.fn()
}));
const token = 'some-token-to-be-used';
const [navigate] = Array(1).fill(jest.fn());
const props = {
  ...navProps,
  navigation: {
    ...navProps.navigation,
    navigate
  },
  loginSuccess: jest.fn()
};
const component = shallow(<Home {...props} />);
let AppLoading = component.find(`[testId="app-loading"]`);
describe('<App />', () => {
  let instance;
  beforeEach(() => {
    instance = component.instance();
    jest.spyOn(instance, 'bootstrapAsync');
    instance.forceUpdate();
  });

  afterEach(() => {
    instance.bootstrapAsync.mockClear();
  });

  test('should render correctly', () => {
    expect(component).toMatchSnapshot();
    expect(component.state().isLoading).toBe(true);
  });

  test('should check auth', async () => {
    AppLoading = await component.find(`[testId="app-loading"]`);
    await AppLoading.props().startAsync();
    expect(instance.bootstrapAsync).toBeCalled();
    expect(navigate).toBeCalledWith('Auth');
  });

  test('should should navigate to Main screen if authenticated', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementationOnce(() => token);
    await AppLoading.props().startAsync();
    expect(navigate).toBeCalledWith('Auth');
  });

  test('should update component state on finish loading', async () => {
    await AppLoading.props().onFinish();
    expect(component.state().isLoading).toBe(false);
  });

  test('should navigate to auth screen on error', async () => {
    await AppLoading.props().onError();
  });

  test('should navigate to auth screen on error', async () => {
    await AppLoading.props().onError();
    expect(navigate).toBeCalledWith('Auth');
  });
});
