import React from 'react';
import {connect} from 'react-redux';
import BookingShow from './booking_show';
import { sendErrors } from '../../actions/session_actions';
import { deleteBooking } from '../../actions/booking_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchUser } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    date: state.session.info.date,
    booked_by_id: state.session.info.booked_by_id,
    time: state.session.info.time,
    court_num: state.session.info.court_num,
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id],
    courts: state.entities.courts,
    title: state.session.info.title,
    bookid: state.session.info.bookid,
    users: state.entities.users,
    courts: state.entities.courts,
    bookings: state.entities.bookings.bookings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    deleteBooking: (id, rec) => dispatch(deleteBooking(id, rec)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingShow);
