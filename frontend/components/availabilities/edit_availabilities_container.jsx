import React from 'react';
import {connect} from 'react-redux';
import EditAvailabilities from './edit_availabilities';
import { sendErrors } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchPros } from '../../actions/user_actions';
import { createAvailability, fetchAvailabilities, deleteAvailability } from '../../actions/availability_actions';
import { openModal } from '../../actions/modal_actions';


const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id],
    pros: Object.values(state.entities.users).filter(pro => pro.pro_member === 'pro') || [username: ''],
    prosOb: state.entities.users,
    avails: Object.values(state.entities.availabilities),
    currentPro: state.session.info.pro_id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchPros: (id) => dispatch(fetchPros(id)),
    createAvailability: (availability) => dispatch(createAvailability(availability)),
    deleteAvailability: (id) => dispatch(deleteAvailability(id)),
    fetchAvailabilities: (id) => dispatch(fetchAvailabilities(id)),
    openModal: (info) => dispatch(openModal(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAvailabilities);
