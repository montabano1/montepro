import {connect} from 'react-redux';
import ClubRegister from './club_register';
import { sendErrors } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { createClub } from '../../actions/club_actions';
import { createMembership } from '../../actions/membership_actions';
import { updateUser } from '../../actions/user_actions';
import { sendInfo } from '../../actions/court_actions';


const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMembership: (membership) => dispatch(createMembership(membership)),
		processForm: (club) => dispatch(createClub(club)),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal()),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    editUser: (user) => dispatch(updateUser(user)),
    sendInfo: (info) => dispatch(sendInfo(info)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubRegister);
