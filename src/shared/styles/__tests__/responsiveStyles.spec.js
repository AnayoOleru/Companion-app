import {
  checkDeviceHeight,
  checkDeviceWidth
} from '../responsiveStyles';

let deviceName;

describe('Check deviceHeight', () => {
  it('should check for iPhone5s ', async () => {
    deviceName = 'iPhone 5s';
    const response = checkDeviceHeight(
      '4%', '3%', '5%', deviceName
    );
    expect(response).toBe(53.5);
  });
});

describe('Check deviceWidth', () => {
  it('should check for iPhone5s ', async () => {
    deviceName = 'iPhone 5s';
    const response = checkDeviceWidth(
      '4%', '3%', '5%', '5%', '5%', deviceName
    );
    expect(response).toBe(30);
  });
  it('should check For Lesser Androids', async () => {
    deviceName = 'android';
    const response = checkDeviceWidth(
      '4%', '3%', '5%', '5%', '5%', null, deviceName
    );
    expect(response).toBe(22.5);
  });
});
