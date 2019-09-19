import messageReducer from '../../messages/reducer';
import * as actions from '../../messages/actions';
import initialState from '../../messages/state';

describe('Message Reducer', () => {
  it('Reducer export test', () => {
    expect(messageReducer).toBeTruthy();
  });
  it('should return initialState', () => {
    const newState = messageReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  it('Should Send Message', () => {
    const messageObject = { text: 'Hello Companions App' };
    const message = [messageObject];
    const action = actions.displayMessage(message);
    const newState = messageReducer(initialState, action);
    expect(newState.messages[0]).toEqual(messageObject);
  });
  it('Should Mock Dialogflow Request', () => {
    const isBotProcessing = true;
    const action = actions.dialogFlowRequest();
    const newState = messageReducer(initialState, action);
    expect(newState.isBotProcessing).toEqual(isBotProcessing);
  });
  it('Should Mock Dialogflow Failure', () => {
    const isBotProcessing = false;
    const action = actions.responseDialogFlowFailure();
    const newState = messageReducer(initialState, action);
    expect(newState.isBotProcessing).toEqual(isBotProcessing);
  });
});
