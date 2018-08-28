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
            <option value='' label='Please choose' />
            <option value={`/court/${today.getFullYear()}-${(today.getMonth() + 101).toString().slice(1)}-${(today.getDate() + 100).toString().slice(1)}`} label='Book a court' />
            <option value='/lesson' label='Book a lesson' />
            <option value='/register' label='Register for Clinic / Tournament' />
            <option value='/teamemail' label='Send team an email' />
            <option value='/game' label='Find a game' />
            <option value='/profile' label='Update your profile' />
            <option value='/lookup' label='Club Lookup' />
          </select>
        </div>

        <section className='pro-options-list'>
          <Link to={`/court/${today.getFullYear()}-${(today.getMonth() + 101).toString().slice(1)}-${(today.getDate() + 100).toString().slice(1)}`}>
            <div className='button-options'>Book a Court</div>
          </Link>
          <Link to={'/register'}>
            <div className='button-options'>Register for Clinic / Tournament</div>
          </Link>
          <Link to={'/game'}>
            <div className='button-options'>Find a Game</div>
          </Link>
          <Link to={'/comment'}>
          <div className='button-options'>Leave a Comment for Your Pro</div>
          </Link>
          <Link to={'/lesson'}>
            <div className='button-options'>Book a Lesson</div>
          </Link>
          <Link to={'/Profile'}>
            <div className='button-options'>Update Profile</div>
          </Link>
          <Link to={'/Lookup'}>
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
