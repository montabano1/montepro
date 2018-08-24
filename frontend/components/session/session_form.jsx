import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      pro_member: "",
      club_id: 0,
      authorized: 'false'
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
    const fieldErrors = [];
    if(this.state.email.length === 0) {
      fieldErrors.push('Please enter your Email');
    }
    if(this.state.password.length === 0) {
      fieldErrors.push('Please enter your Password');
    } else if(this.state.password.length < 6) {
      fieldErrors.push('Password must be at least 6 characters');
    }
    if(this.state.pro_member.length === 0 && this.props.formType === 'Sign up') {
      fieldErrors.push('Please choose if you are a pro or member');
    }
    if(fieldErrors.length > 0) {
      this.props.sendErrors(fieldErrors);
    } else {
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => {
      this.props.closeModal();
      window.scrollTo(0, 0);
      this.props.history.push('/options');
    });}
  }

	render() {
		if(this.props.formType === 'Sign up') {
      return (
        <div className='login-form'>
					<div id='please-sign-up'>
            <h3 >Sign up!</h3>
          </div>
          <div className='errors-div'>{this.renderErrors()}</div>
					<form onSubmit={this.handleSubmit} className='login-form'>
              <input
                className='email-input'
                type="text"
                placeholder='Full Name'
                onChange={this.update('username')} />
              <input
                className='email-input'
                type="text"
                placeholder='Email'
                onChange={this.update('email')} />
              <input
                className='password-input'
  							type="password"
                placeholder='Password'
                onChange={this.update('password')} />
              <section className='pro-member'> Please choose one:
                <input
                  className='pro-member-input'
                  type="radio"
                  onChange={this.update('pro_member')}
                  value='pro'/> Club Pro
                <input
                  className='pro-member-input'
                  type="radio"
                  onChange={this.update('pro_member')}
                  value='member' /> Club Member
              </section>
            <input className='submit-button' type="submit" value={this.props.formType} />
          </form>
        </div>
      );
    } else {
      return (
				<div className='login-form'>
					<div id='please-sign-in'>
            <h3 >Please sign in</h3>
          </div>
          <div className='errors-div'>{this.renderErrors()}</div>
					<form onSubmit={this.handleSubmit} className='login-form'>
              <input
                className='email-input'
                type="text"
                placeholder='email'
                onChange={this.update('email')} />
              <input
                className='password-input'
  							type="password"
                placeholder='password'
                onChange={this.update('password')} />
              <div className='forgot-password'>
                <a href="#">Forgot Password?</a>
              </div>
            <input className='submit-button' type="submit" value={this.props.formType} />
          </form>
        </div>
      );
    }
  }

}

export default withRouter(SessionForm);
