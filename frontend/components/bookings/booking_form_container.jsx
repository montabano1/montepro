import React from 'react';
import {connect} from 'react-redux';
import BookingForm from './booking_form';
import { sendErrors } from '../../actions/session_actions';
import { createBooking } from '../../actions/booking_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchClub } from '../../actions/club_actions';

const mapStateToProps = (state) => {
  return {
    date: state.session.info.date,
    start_time: state.session.info.start_time,
    club_id: state.session.info.club_id,
    court_num: state.session.info.court_num,
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id],
    name: state.session.info.name,
    bookings: state.entities.bookings,
    courts: state.entities.courts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchClub: (id) => dispatch(fetchClub(id)),
    createBooking: (booking) => dispatch(createBooking(booking)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
