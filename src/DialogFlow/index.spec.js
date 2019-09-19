import DialogFlow from './index';

global.fetch = jest.fn();

describe('RequestQueryPayload', () => {
  const jsonWrap = data => ({
    json: () => Promise.resolve(data)
  });

  const success = {
    status: 'passed'
  };
  const failure = {
    status: 'failed'
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch').mockImplementation((url, reqBody) => {
      const data = JSON.parse(reqBody.body);
      const result = data.queryInput.text.text;
      return new Promise((resolve, reject) => {
        if (result === 'Hello') {
          resolve(jsonWrap(success));
        } else {
          reject(failure);
        }
      });
    });
  });

  it('should pass when fetch was resolved', async () => {
    const fakeArgs = {
      query: 'Hello',
      payload: {},
      onResult: jest.fn(),
      onError: jest.fn()
    };

    await DialogFlow.requestQueryPayload(
      fakeArgs.query,
      fakeArgs.payload,
      fakeArgs.onResult,
      fakeArgs.onError
    );
    expect(fakeArgs.onResult).toHaveBeenCalledWith(success);
  });

  it('should fail when fetch is rejected', async () => {
    const fakeArgs = {
      query: 'Hell',
      payload: {},
      onResult: jest.fn(),
      onError: jest.fn()
    };

    await DialogFlow.requestQueryPayload(
      fakeArgs.query,
      fakeArgs.payload,
      fakeArgs.onResult,
      fakeArgs.onError
    );

    expect(fakeArgs.onError).toHaveBeenCalledWith(failure);
  });
});

describe('RequestEventPayload', () => {
  const jsonWrap = data => ({
    json: () => Promise.resolve(data)
  });

  const success = {
    status: 'passed'
  };
  const failure = {
    status: 'failed'
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch').mockImplementation((url, reqBody) => {
      const data = JSON.parse(reqBody.body);
      const result = data.queryInput.event.name;
      return new Promise((resolve, reject) => {
        if (result === 'Hello') {
          resolve(jsonWrap(success));
        } else {
          reject(failure);
        }
      });
    });
  });

  it('should pass when fetch was resolved', async () => {
    const fakeArgs = {
      eventName: 'Hello',
      parameters: { test: 'Hello' },
      payload: {},
      onResult: jest.fn(),
      onError: jest.fn()
    };

    await DialogFlow.requestEventPayload(
      fakeArgs.eventName,
      fakeArgs.parameters,
      fakeArgs.payload,
      fakeArgs.onResult,
      fakeArgs.onError
    );
    expect(fakeArgs.onResult).toHaveBeenCalledWith(success);
  });
});
