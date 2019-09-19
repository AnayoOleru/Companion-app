import attendeesReducer from '../../attendees/reducers';
import * as types from '../../attendees/types';

const initialState = {
  error: {},
  text: '',
  pinnedAttendees: [],
  isLoading: false
};

const user = {
  imageUrl: 'image',
  username: 'test',
  userId: 2,
  email: 'test@gmail.com'
};

describe('Attendees Reducer', () => {
  it('Reducer export test', () => {
    expect(attendeesReducer).toBeTruthy();
  });
  it('should return initialState', () => {
    const newState = attendeesReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  it('should add attendee', () => {
    const store = attendeesReducer(
      {
        ...initialState
      },
      {
        type: types.PIN_ATTENDEES,
        payload: {
          pinnedAttendees: [user]
        }
      }
    );
    expect(store.pinnedAttendees.length).toEqual(1);
  });
  it('should unpin attendee', () => {
    const store = attendeesReducer(
      {
        ...initialState,
        pinnedAttendees:
          [{ email: 'test@gmail.com' }, { email: 'caleb@gmail.com' }]
      },
      {
        type: types.REMOVE_ATTENDEE,
        payload: 'caleb@gmail.com'
      }
    );
    expect(store.pinnedAttendees.length).toEqual(1);
  });
});
