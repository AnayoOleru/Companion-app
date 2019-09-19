import { Dialogflow_V2 as DialogFlow } from 'react-native-dialogflow-text';
import { CLIENT_EMAIL, PRIVATE_KEY, PROJECT_ID } from 'react-native-dotenv';
import moment from 'moment-timezone';

const DEFAULT_BASE_URL = 'https://dialogflow.googleapis.com/v2/projects/';
DialogFlow.setConfiguration(
  CLIENT_EMAIL,
  PRIVATE_KEY,
  DialogFlow.LANG_ENGLISH_US,
  PROJECT_ID
);

const request = (data, accessToken) => fetch(
  `${DEFAULT_BASE_URL + DialogFlow.projectId}/agent/sessions/${
    DialogFlow.sessionId
  }:detectIntent`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
      charset: 'utf-8'
    },
    body: JSON.stringify(data)
  }
);

DialogFlow.requestQueryPayload = async (
  query, payload, onResult, onError) => {
  const data = {
    queryParams: {
      contexts: DialogFlow.mergeContexts(
        DialogFlow.contexts,
        DialogFlow.permanentContexts
      ),
      sessionEntityTypes: [],
      timeZone: moment.tz.guess(true),
      payload
    },
    queryInput: {
      text: {
        text: query,
        languageCode: DialogFlow.languageTag
      }
    }
  };

  DialogFlow.contexts = null;
  DialogFlow.entities = null;
  request(data, DialogFlow.accessToken).then((response) => {
    response.json().then(onResult);
  })
    .catch(onError);
};

DialogFlow.requestEventPayload = async (
  eventName, eventParameters, payload, onResult, onError) => {
  const data = {
    queryParams: {
      contexts: DialogFlow.mergeContexts(
        DialogFlow.contexts,
        DialogFlow.permanentContexts
      ),
      sessionEntityTypes: [],
      payload
    },
    queryInput: {
      event: {
        name: eventName,
        parameters: eventParameters,
        languageCode: DialogFlow.languageTag
      }
    }
  };

  DialogFlow.contexts = null;
  DialogFlow.entities = null;
  request(data, DialogFlow.accessToken).then((response) => {
    response.json().then(onResult);
  })
    .catch(onError);
};

export default DialogFlow;
