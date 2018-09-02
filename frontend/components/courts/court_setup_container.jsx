import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import CourtSetup from './court_setup';
import { createCourt } from '../../actions/court_actions';
import { updateUser } from '../../actions/user_actions';
import { fetchClub } from '../../actions/club_actions';
import { sendErrors } from '../../actions/session_actions';



const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    club_id: state.session.info.club_id,
    court_amt: state.session.court_amt,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCourt: (court) => dispatch(createCourt(court)),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    editUser: (user) => dispatch(updateUser(user)),
    fetchClub: (id) => dispatch(fetchClub(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourtSetup);
