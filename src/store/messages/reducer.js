import {
  DISPLAY_MESSAGE,
  SEND_DIALOGFLOW_REQUEST,
  RESPONSE_DIALOGFLOW_FAILURE
} from './actionTypes';
import initialState from './state';

export default (state = initialState, actions) => {
  const { type, message } = actions;
  switch (type) {
    case DISPLAY_MESSAGE:
      return {
        ...state,
        isBotProcessing: false,
        messages: [...message, ...state.messages]
      };
    case SEND_DIALOGFLOW_REQUEST:
      return {
        ...state,
        isBotProcessing: true
      };
    case RESPONSE_DIALOGFLOW_FAILURE:
      return {
        ...state,
        isBotProcessing: false
      };
    default:
      return state;
  }
};
