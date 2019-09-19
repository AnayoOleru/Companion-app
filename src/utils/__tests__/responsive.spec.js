import { currentTimeRatio } from '../responsiveDimensions';

describe('CurrentTimeRatio Tests', () => {
  test('should return position ratio ', () => {
    expect(currentTimeRatio(808)).toEqual(255);
    expect(currentTimeRatio(760)).toEqual(280);
    expect(currentTimeRatio(608)).toEqual(290);
    expect(currentTimeRatio(407)).toEqual(310);
  });
});
