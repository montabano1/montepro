import React from 'react';
import {connect} from 'react-redux';
import EventForm from './event_form';
import { sendErrors } from '../../actions/session_actions';
import { createEvent } from '../../actions/event_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchClub } from '../../actions/club_actions';
import { fetchCourts } from '../../actions/court_actions';
import { fetchPros } from '../../actions/user_actions';
import { fetchBookings, createBooking, createBookings } from '../../actions/booking_actions';

const mapStateToProps = (state) => {
  const courts = Object.values(state.entities.courts).sort(function(a, b) {
  var nameA = a.name.toUpperCase();
  var nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});
  return {
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id],
    pros: Object.values(state.entities.users),
    courts: courts,
    courtsCheck: state.entities.courts,
    bookings: state.entities.bookings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchClub: (id) => dispatch(fetchClub(id)),
    fetchCourts: (id) => dispatch(fetchCourts(id)),
    createEvent: (event) => dispatch(createEvent(event)),
    createBooking: (booking) => dispatch(createBooking(booking)),
    createBookings: (bookings) => dispatch(createBookings(bookings)),
    fetchPros: (id) => dispatch(fetchPros(id)),
    fetchBookings: (id, date) => dispatch(fetchBookings(id, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
