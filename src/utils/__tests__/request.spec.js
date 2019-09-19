import request from '../request';
import { mockFetchWithMessage } from '../../../__tests__/mock/libraries';

const makeRequest = async () => request('https://api-me.global.com');
describe('Request function', () => {
  it('should resolve with 200 status', async () => {
    mockFetchWithMessage('ok', 200);
    const data = await makeRequest();
    expect(data.message).toEqual('ok');
  });

  it('should resolve with 201 status', async () => {
    mockFetchWithMessage('created', 201);
    const data = await request('https://api-me.global.com');
    expect(data.message).toEqual('created');
  });

  it('should resolve with 200 status', async () => {
    mockFetchWithMessage('not found', 404);
    try {
      await makeRequest();
    } catch (error) {
      expect(error.message).toEqual('not found');
    }
  });

  it('should resolve with 200 status', async () => {
    mockFetchWithMessage('bad request', 400);
    try {
      await request('https://api-me.global.com');
    } catch (error) {
      expect(error.message).toEqual('bad request');
    }
  });
});
