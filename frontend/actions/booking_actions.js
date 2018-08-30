import * as APIUtil from '../util/booking_api_util';
export const RECEIVE_BOOKING = 'RECEIVE_BOOKING';
export const RECEIVE_BOOKINGS = 'RECEIVE_BOOKINGS';
export const RECEIVE_CREATIONS = 'RECEIVE_CREATIONS';

export const receiveBooking = booking => {
  return {
    type: RECEIVE_BOOKING,
    booking
  };
};

export const receiveBookings = bookings => {
  return {
    type: RECEIVE_BOOKINGS,
    bookings: {bookings: bookings}
  };
};
export const receiveCreations = bookings => {
  return {
    type: RECEIVE_CREATIONS,
    bookings
  };
};

export const fetchBooking = (id) => {
  return dispatch => {
    return APIUtil.fetchBooking(id).then(
      booking => dispatch(receiveBooking(booking))
    );
  };
};
export const fetchBookings = (id, date) => {
  return dispatch => {
    return APIUtil.fetchBookings(id, date).then(
      bookings => dispatch(receiveBookings(bookings))
    );
  };
};
export const createBooking = (booking) => {
  return dispatch => {
    return APIUtil.createBooking(booking).then(
      booking => dispatch(receiveBooking(booking))
    );
  };
};
export const createBookings = (bookings) => {
  return dispatch => {
    return APIUtil.createBooking(bookings).then(
      bookings => dispatch(receiveCreations(bookings))
    );
  };
};
