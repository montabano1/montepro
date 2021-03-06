import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { fetchClub } from '../../actions/club_actions';

class ProOptions extends React.Component {

  componentDidMount() {
    this.props.fetchClub(this.props.currentUser.club_id);
    window.scrollTo(0, 0)
  }

  render() {
    const today = new Date();
    return(

      (this.props.currentUser.pro_member === 'pro' && this.props.currentUser.authorized === 'false') ?
      <Redirect to="/options/pro/courtsetup" /> :
      <main className='pro-options'>
        <section className='options-heading'>
          Please click on one of the following:
        </section>
        <section className='pro-options-list'>
          <Link to={`/court/${today.getFullYear()}-${(today.getMonth() + 101).toString().slice(1)}-${(today.getDate() + 100).toString().slice(1)}`}>
            <div className='button-options'>Create / Edit Court Times</div>
          </Link>
          <Link to={'/clinic'}>
          <div className='button-options'>Create / Edit Event (Clinic, Tournament, etc.)</div>
          </Link>
          <Link to={'/availabilities'}>
            <div className='button-options'>Create / Edit Pro Availabilities</div>
          </Link>
          <Link to={'/prolookup'}>
            <div className='button-options'>Pro Lookup</div>
          </Link>
          <Link to={'/memberlookup'}>
            <div className='button-options'>Member Lookup</div>
          </Link>
          <Link to={'/security'}>
            <div className='button-options'>Edit Member / Pro Privileges</div>
          </Link>
          <Link to={'/email'}>
            <div className='button-options'>Email Team / Members</div>
          </Link>
          <Link to={'/team'}>
            <div className='button-options'>Create / Edit / Delete Team</div>
          </Link>
          <Link to={'/lineup'}>
            <div className='button-options'>Create Lineup</div>
          </Link>
        </section>
      </main>
    );
  }
};

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = dispatch => {
  return{
    fetchClub: (id) => dispatch(fetchClub(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProOptions)
