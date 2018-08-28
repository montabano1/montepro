import React from 'react';
import {connect} from 'react-redux';
import createAvailabilityForm from './create_availability_form';
import { sendErrors } from '../../actions/session_actions';
import { createEvent } from '../../actions/event_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchPros } from '../../actions/user_actions';
import { createAvailability } from '../../actions/availability_actions';


const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id],
    pros: Object.values(state.entities.users),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchPros: (id) => dispatch(fetchPros(id)),
    createAvailability: (availability) => dispatch(createAvailability(availability)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createAvailabilityForm);
