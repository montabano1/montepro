import React from 'react';
import {connect} from 'react-redux';
import EventForm from './event_form';
import { sendErrors } from '../../actions/session_actions';
import { createEvent } from '../../actions/booking_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchClub } from '../../actions/club_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchClub: (id) => dispatch(fetchClub(id)),
    createEvent: (booking) => dispatch(createEvent(booking)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
