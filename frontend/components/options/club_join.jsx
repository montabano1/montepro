import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class ClubJoin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      secret: "",
      club_id: 0,
    };
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

	update(field) {
	  return (e) => {
	    this.setState({[field]: e.target.value});
	  };
	}
	updateClub() {
	  return (e) => {
      const num = e.target.value.split(' ');
	    this.setState({club_id: num.shift(), name: num.join('')});
      console.log(this.state);
	  };
	}


  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

	handleSubmit(e) {
    e.preventDefault();
    const fieldErrors = [];
    if(this.state.name.length === 0) {
      fieldErrors.push('Please enter Club Name');
    }
    if(this.state.name.secret === 0) {
      fieldErrors.push('Please enter Club Password');
    }
    if(this.props.clubs[this.state.club_id].secret != this.state.secret) {
      fieldErrors.push('Incorrect Password');
    }
    if(fieldErrors.length > 0) {
      this.props.sendErrors(fieldErrors);
    } else {
      const user = Object.assign({}, this.props.currentUser, {authorized: 'true', club_id: this.state.club_id})
      this.props.updateUser(user).then(() => {
        this.props.createMembership({member_id: this.props.currentUser.id, club_id: this.state.club_id});
        this.props.closeModal();
        window.scrollTo(0, 0)
        this.props.history.push(`/options/${this.props.currentUser.pro_member}`);
      });
    }
  }

  componentDidMount() {
    this.props.fetchClubs();
  }
	render() {
    const clurbs = Object.values(this.props.clubs).map((club, i) => {
      return (
        <option value={`${club.id}  ${club.name}`} label={`${club.address}`} key={`${club.id}`}/>
      );
    })
    return (
      <div className='login-form'>
				<div id='please-sign-up'>
          <h3 >Join your Club!</h3>
        </div>
        <div className='errors-div'>{this.renderErrors()}</div>
        <datalist id="clubs">
          {clurbs}
        </datalist>
				<form onSubmit={this.handleSubmit} className='login-form'>
            <input
              className='email-input'
              type="text"
              list="clubs"
              placeholder="Club Name"
              onChange={this.updateClub()} />
            <input
              className='email-input'
              type="text"
              placeholder='Club password'
              onChange={this.update('secret')} />
          <input className='submit-button' type="submit" value="Join Club" />
        </form>
      </div>
    );
  }

}

export default withRouter(ClubJoin);
