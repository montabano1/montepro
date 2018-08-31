import { merge } from 'lodash';
import { RECEIVE_BOOKING, RECEIVE_BOOKINGS, RECEIVE_CREATIONS, RECEIVE_DELETED_BOOKINGS } from '../actions/booking_actions';

const bookingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOOKINGS:
      return merge({}, action.bookings);
    case RECEIVE_DELETED_BOOKINGS:
      const deleted = Object.keys(action.bookings.bookings).map(b => parseInt(b));
      let newBookings = merge({}, state.bookings);
      deleted.forEach(num => delete newBookings[num]);
      const newState = {bookings: newBookings};
      return newState;
    case RECEIVE_CREATIONS:
      return merge({}, state, action.bookings);
    case RECEIVE_BOOKING:
      const newBooking = { [action.booking.id]: action.booking };
      return merge({}, state, newBooking);
    default:
      return state;
  }
};

export default bookingsReducer;
