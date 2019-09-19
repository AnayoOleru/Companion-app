import { createStore } from 'redux';
import { rootReducer } from '..';
import * as actions from '../messages/actions';

describe('Store test', () => {
  it('Should Handle send message', () => {
    const messageObject = {
      text: 'Hello from companion app'
    };
    const messages = [messageObject];
    const store = createStore(rootReducer);
    const action = actions.displayMessage(messages);
    store.dispatch(action);

    const sentMessage = store.getState();
    expect(sentMessage.messages.messages[0]).toEqual(messageObject);
  });
});
