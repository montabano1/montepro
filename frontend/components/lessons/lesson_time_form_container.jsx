import React from 'react';
import {connect} from 'react-redux';
import LessonTimeForm from './lesson_time_form';
import { sendErrors } from '../../actions/session_actions';
import { createBookings, fetchBookings } from '../../actions/booking_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchClub } from '../../actions/club_actions';
import { fetchPros } from '../../actions/user_actions';


const mapStateToProps = (state) => {
  return {
    date: state.session.info.date,
    time: state.session.info.time,
    club_id: state.session.info.club_id,
    court_num: state.session.info.court_num,
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id],
    name: state.session.info.name,
    bookings: state.entities.bookings,
    courts: state.entities.courts,
    pros: Object.values(state.entities.users).filter(pro => pro.pro_member === 'pro'),
    prosOb: state.entities.users,
    avails: state.entities.availabilities,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchClub: (id) => dispatch(fetchClub(id)),
    createBookings: (booking) => dispatch(createBookings(booking)),
    fetchBookings: (id) => dispatch(fetchBookings(id)),
    fetchPros: (id) => dispatch(fetchPros(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonTimeForm);
