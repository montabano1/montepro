import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


class ClubForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      director_id: props.currentUser.id,
      court_amt: "",
      lng: "",
      lat: "",
      secret: "",
      phone_number: "",
      email: "",
      address: "",
    };
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

	update(field) {
	  return (e) => {
	    this.setState({[field]: e.target.value});
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
    let fieldErrors = [];
    if(this.state.name.length === 0) {
      fieldErrors.push('Please enter Club Name');
    }
    if(this.state.court_amt.length === 0) {
      fieldErrors.push('Please enter Court Amount');
    }
    if(this.state.secret.length === 0) {
      fieldErrors.push('Please enter Club Password');
    }
    if(this.state.email.length === 0) {
      fieldErrors.push('Please enter Email');
    }
    if(this.state.phone_number.length === 0) {
      fieldErrors.push('Please enter Phone Number');
    }
    if(this.state.address.length === 0) {
      fieldErrors.push('Please enter Address');
    }
    if(fieldErrors.length > 0) {
      this.props.sendErrors(fieldErrors);
    } else {
    const club = Object.assign({}, this.state);

    this.props.processForm(club).then((clurb) => {
      this.props.createMembership({member_id: this.props.currentUser.id, club_id: clurb.club.id});
      this.props.editUser(Object.assign({}, this.props.currentUser, {club_id: clurb.club.id}));
      this.props.sendInfo({club_id: clurb.club.id})
      this.props.closeModal();
      window.scrollTo(0, 0)
      this.props.history.push(`/options/pro/courtsetup/${this.state.court_amt}`);
    });}
  }

	render() {
    return (
      <div className='login-form'>
				<div id='please-sign-up'>
          <h3 >Create your Club!</h3>
        </div>
        <div className='errors-div'>{this.renderErrors()}</div>
				<form onSubmit={this.handleSubmit} className='login-form'>
            <input
              className='email-input'
              type="text"
              placeholder='Club Name'
              onChange={this.update('name')} />
            <input
              className='email-input'
              type="number"
              placeholder='Number of Courts (Tennis + Paddle + Other)'
              onChange={this.update('court_amt')} />
            <input
              className='email-input'
              type="text"
              placeholder='Password for Members'
              onChange={this.update('secret')} />
            <input
              className='email-input'
              type="text"
              placeholder='Contact Phone for Members'
              onChange={this.update('phone_number')} />
            <input
              className='email-input'
              type="text"
              placeholder='Contact Email for Members'
              onChange={this.update('email')} />
            <input
              className='email-input'
              type="text"
              placeholder='Address for Directions'
              onChange={this.update('address')} />
          <input className='submit-button' type="submit" value="Create Club" />
        </form>
      </div>
    );
  }

}

export default withRouter(ClubForm);
