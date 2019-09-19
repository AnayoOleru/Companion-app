export const G_CALENDAR_EVENTS = (email = 'primary') => `https://www.googleapis.com/calendar/v3/calendars/${email}/events?&maxResults=2500&maxAttendees=5&singleEvents=true&orderBy=startTime`;
export const ANDELANS_INFO = `https://api-prod.andela.com/api/v1/users/basic?search=`;
