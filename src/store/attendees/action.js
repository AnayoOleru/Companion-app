import { PIN_ATTENDEES, REMOVE_ATTENDEE, RESET_ATTENDEE } from './types';
import { getUserData } from '../../utils/helpers';

export const pinAttendeesAction = item => (dispatch) => {
  const alternativeImage = 'https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png';
  const user = getUserData(item, alternativeImage);
  dispatch({
    type: PIN_ATTENDEES,
    payload: user
  });
};

export const unpinAttendeeAction = email => ({
  type: REMOVE_ATTENDEE,
  payload: email
});

export const resetAttendeeAction = () => ({
  type: RESET_ATTENDEE
});
