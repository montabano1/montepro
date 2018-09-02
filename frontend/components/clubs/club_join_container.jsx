import {connect} from 'react-redux';
import { sendErrors } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { updateUser } from '../../actions/user_actions';
import { fetchClubs } from '../../actions/club_actions';
import { createMembership } from '../../actions/membership_actions';
import ClubJoin from './club_join';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    clubs: state.entities.clubs,
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMembership: (membership) => dispatch(createMembership(membership)),
		processForm: (user) => dispatch(updateUser(user)),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal()),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchClubs: () => dispatch(fetchClubs()),
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubJoin);
