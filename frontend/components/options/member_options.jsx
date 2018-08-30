import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';

class MemberOptions extends React.Component {

  updateChoice() {
    return (e) => {
      this.props.history.push(e.target.value)
    }
  }

  render() {
    const today = new Date();
    return (
      <main className='pro-options'>
        <section className='options-heading'>
          Please choose on one of the following:
        </section>

        <div>
          <select
            className='choose-option-input'
            type="text"
            onChange={this.updateChoice()}>
            <option value='' >Please choose</option>
            <option value={`/court/${today.getFullYear()}-${(today.getMonth() + 101).toString().slice(1)}-${(today.getDate() + 100).toString().slice(1)}`} >Book a court</option>
            <option value='/lesson' >Book a lesson</option>
            <option value='/register' >Register for Adult Clinic / Tournament</option>
            <option value='/kidsregister' >Register for Kids Clinic</option>
            <option value='/teamemail' >Send team an email</option>
            <option value='/game' >Find a game</option>
            <option value='/profile' >Update your profile</option>
            <option value='/lookup' >Club Lookup</option>
          </select>
        </div>

        <section className='pro-options-list'>
          <Link to={`/court/${today.getFullYear()}-${(today.getMonth() + 101).toString().slice(1)}-${(today.getDate() + 100).toString().slice(1)}`}>
            <div className='button-options'>Book a Court</div>
          </Link>
          <Link to={'/register'}>
            <div className='button-options'>Register for Adult Clinic / Tournament</div>
          </Link>
          <Link to={'/game'}>
            <div className='button-options'>Find a Game</div>
          </Link>
          <Link to={'/teamemail'}>
          <div className='button-options'>Send your team an email</div>
          </Link>
          <Link to={'/lesson'}>
            <div className='button-options'>Book a Lesson</div>
          </Link>
          <Link to={'/kidsregister'}>
            <div className='button-options'>Register for Kids Clinic</div>
          </Link>
          <Link to={'/profile'}>
            <div className='button-options'>Update Profile</div>
          </Link>
          <Link to={'/lookup'}>
            <div className='button-options'>Club Lookup</div>
          </Link>
        </section>
      </main>
    );
  }

}
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
export default connect(mapStateToProps, mapDispatchToProps)(MemberOptions)
