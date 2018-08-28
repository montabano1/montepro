import React from 'react';
import {connect} from 'react-redux';
import createAvailabilityForm from './create_availability_form';
import { sendErrors } from '../../actions/session_actions';
import { createEvent } from '../../actions/event_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchPros } from '../../actions/user_actions';
import { createAvailability, fetchAvailabilities } from '../../actions/availability_actions';


const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id],
    pros: Object.values(state.entities.users),
    prosOb: state.entities.users,
    avails: Object.values(state.entities.availabilities),
    loaded: false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchPros: (id) => dispatch(fetchPros(id)),
    createAvailability: (availability) => dispatch(createAvailability(availability)),
    fetchAvailabilities: (id) => dispatch(fetchAvailabilities(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createAvailabilityForm);
