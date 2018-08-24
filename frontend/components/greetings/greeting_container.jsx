import { connect } from 'react-redux';
import { logout, login } from '../../actions/session_actions';
import { fetchClub } from '../../actions/club_actions';
import Greeting from './greeting';

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    club: state.entities.clubs
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchClub: id => dispatch(fetchClub(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);
