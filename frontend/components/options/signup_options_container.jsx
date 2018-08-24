import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import SignupOptions from './signup_options';
import { sendErrors } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';



const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  sendErrors: (errors) => dispatch(sendErrors(errors)),
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupOptions);
