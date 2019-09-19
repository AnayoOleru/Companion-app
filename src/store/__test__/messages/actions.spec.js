import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../messages/actions';
import * as types from '../../messages/actionTypes';
import DialogFlow from '../../../DialogFlow';

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);


describe('actions', () => {
  it('should create an action to send Message', () => {
    const message = 'payload';
    const expectedAction = {
      type: types.DISPLAY_MESSAGE,
      message
    };
    expect(actions.displayMessage(message)).toEqual(expectedAction);
  });
});


describe('Async thunk', () => {
  it('should send message to DialogFlow', async () => {
    fetch.once(JSON.stringify({
      queryResult: {
        fulfillmentText: 'event created'
      }
    }));
    const store = mockStore({});
    const message = 'Hi';
    await store.dispatch(actions.sendToDialogFlow(message));
    const expectedActions = store.getActions();
    expect(expectedActions[0]).toEqual({ type: 'SEND_TO_DIALOGFLOW_REQUEST' });
    expect(expectedActions[1]).toEqual({ type: 'SEND_TO_DIALOGFLOW_SUCCESS' });
    expect(expectedActions[2].type).toEqual('DISPLAY_MESSAGE');
  });

  it('should return  error when sending to DialogFlow', async () => {
    jest.spyOn(DialogFlow, 'requestQueryPayload').mockImplementation(
      (a, b, c) => c({
        queryResult: {
          fulfillmentText: 'Hello'
        }
      })
    );

    fetch.once(JSON.stringify({
      queryResult: {
        fulfillmentText: 'event created'
      }
    }));
    const store = mockStore({});
    await store.dispatch(actions.sendToDialogFlow());
    const expectedActions = store.getActions();
    expect(expectedActions[0]).toEqual({ type: 'SEND_TO_DIALOGFLOW_REQUEST' });
    expect(expectedActions[1]).toEqual({ type: 'SEND_TO_DIALOGFLOW_FAILURE' });
  });
});

describe('Async Thunk for Event', () => {
  it('should send event to DialogFlow', async () => {
    jest.spyOn(DialogFlow, 'requestEventPayload').mockImplementation(
      (a, b, c, d) => d({
        queryResult: {
          fulfillmentText: 'event created'
        }
      })
    );

    fetch.once(JSON.stringify({
      queryResult: {
        fulfillmentText: 'event created'
      }
    }));
    const store = mockStore({});
    const attendees = ['test@andela.com'];
    await store.dispatch(actions.sendEventToDialogFlow(attendees));
    const action = store.getActions();
    expect(action[0]).toEqual({ type: 'SEND_TO_DIALOGFLOW_REQUEST' });
    expect(action[1]).toEqual({ type: 'SEND_TO_DIALOGFLOW_SUCCESS' });
    expect(action[2].type).toEqual('DISPLAY_MESSAGE');
    expect(action[3]).toEqual({ type: 'RESET_ATTENDEE' });
  });
});
