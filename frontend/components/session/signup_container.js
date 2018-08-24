import {connect} from 'react-redux';
import SessionForm from './session_form';
import { signup, sendErrors } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchClub } from '../../actions/club_actions';


const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Sign up'
  };
};

const mapDispatchToProps = dispatch => {
  return {
		processForm: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchClub: (id) => dispatch(fetchClub(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
