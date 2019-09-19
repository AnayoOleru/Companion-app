import { handleGoogleResponse, getAccessToken } from '../../utils/helpers';
import * as types from './actionTypes';
import DialogFlow from '../../DialogFlow';
import { resetAttendeeAction } from '../attendees/action';

export const displayMessage = message => ({
  type: types.DISPLAY_MESSAGE,
  message
});

export const dialogFlowRequest = () => ({
  type: types.SEND_DIALOGFLOW_REQUEST
});

export const responseDialogFlowSuccess = () => ({
  type: types.RESPONSE_DIALOGFLOW_SUCCESS
});

export const responseDialogFlowFailure = () => ({
  type: types.RESPONSE_DIALOGFLOW_FAILURE
});

export const successDisplay = response => async (dispatch) => {
  const botMessage = handleGoogleResponse(response);
  return [
    dispatch(responseDialogFlowSuccess()),
    dispatch(displayMessage(botMessage))
  ];
};
export const sendEventToDialogFlow = attendeesWithPayload => async (dispatch) => {
  const {
    attendees, email
  } = attendeesWithPayload;
  const accessToken = await getAccessToken();
  const payload = {
    email, accessToken
  };
  try {
    dispatch(dialogFlowRequest());
    DialogFlow.requestEventPayload(
      'attendees',
      { attendees },
      payload,
      (response) => {
        dispatch(successDisplay(response));
        dispatch(resetAttendeeAction());
      },
    );
  } catch (error) {
    dispatch(responseDialogFlowFailure());
  }
};

export const sendToDialogFlow = message => async (dispatch) => {
  try {
    dispatch(dialogFlowRequest());
    const {
      text, email, token
    } = message;
    const accessToken = await getAccessToken();
    const payload = {
      email, token, accessToken
    };
    DialogFlow.requestQueryPayload(text, payload, (response) => {
      dispatch(successDisplay(response));
    });
  } catch (error) {
    dispatch(responseDialogFlowFailure());
  }
};

export const sendToDialogFlowDisplay = message => async dispatch => [
  dispatch(displayMessage([message])),
  dispatch(sendToDialogFlow(message))
];
