import { AsyncStorage } from 'react-native';

export const mockAsyncStorage = (accessToken) => {
  jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => accessToken);
};

export const mockFetchWithValues = (data) => {
  global.fetch = jest.fn().mockImplementation(() => ({
    json: () => Promise.resolve({ values: data }),
    ok: true
  }));
};

export const mockFetchWithMessage = (message, status) => {
  global.fetch = jest.fn().mockImplementation(() => ({
    json: () => ({ message }),
    status
  }));
};

export const mockFetchWithPromises = (events) => {
  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    status: 500,
    json: () => Promise.resolve(events)
  }));
};
