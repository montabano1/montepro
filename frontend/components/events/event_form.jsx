import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';

class EventForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      start_time: 0,
      end_time: 0,
      club_id: this.props.currentUser.club_id,
      title: '',
      maxppl: 0,
      registerable: 'yes',
      event_type: '',
    };
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  update() {
	  return (e) => {
	    this.setState({title: e.target.value});
    };
	}
  updateColor(field) {
	  return (e) => {
	    this.color[field] = e.target.value;
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
    if(fieldErrors.length > 0) {
      this.props.sendErrors(fieldErrors);
    } else {

    this.props.createEvent(this.state).then((event) => {
      this.props.closeModal();
      window.scrollTo(0, 0)
      this.props.history.push(`/events/${event.event.id}`);
    });}
  }

  render() {
    return (
      <div className='login-form'>
				<div id='please-sign-up'>
          <h3 >Create your Event!</h3>
        </div>
        <div className='errors-div'>{this.renderErrors()}</div>
				<form onSubmit={this.handleSubmit} className='event-form'>
            <strong> Title: </strong>
            <input
              className='event-title'
              type="text"
              placeholder='ex. Cardio Tennis or Lesson w/ G. Smith'
              onChange={this.update('title')} />
            <br/>
            <strong> Date: </strong>
            <input type="date" onChange={this.update('date')} />
            <strong> Event Type: </strong>
            <select
              className='email-input'
              onChange={this.update('event_type')} >
              <option value='Clinic'>Clinic</option>
              <option value='Tournament'>Tournament</option>
              <option value='Match'>Match</option>
              <option value='Member Event'>Member Event</option>
              <option value='Other'>Other</option>
            </select>
            <strong> Can members register? :</strong>
            <select
              className='event-register'
              type="text"
              placeholder='Password for Members'
              onChange={this.update('registerable')} >
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
            <strong> Max number of registrants: </strong>
            <input
              className='event-max'
              type="number"
              placeholder='Max number of registrants'
              onChange={this.update('maxppl')} />
            <strong> Event start time: </strong>
            <select
              className='event-start'
              type="text"
              placeholder='Event start time'
              onChange={this.update('email')} >
              <option className='court-time' value="6:00">6:00 AM</option>
              <option className='court-time' value="6:30">6:30 AM</option>
              <option className='court-time' value="7:00">7:00 AM</option>
              <option className='court-time' value="7:30">7:30 AM</option>
              <option className='court-time' value="8:00">8:00 AM</option>
              <option className='court-time' value="8:30">8:30 AM</option>
              <option className='court-time' value="9:00">9:00 AM</option>
              <option className='court-time' value="9:30">9:30 AM</option>
              <option className='court-time' value="10:00">10:00 AM</option>
              <option className='court-time' value="10:30">10:30 AM</option>
              <option className='court-time' value="11:00">11:00 AM</option>
              <option className='court-time' value="11:30">11:30 AM</option>
              <option className='court-time' value="12:00">12:00 PM</option>
              <option className='court-time' value="12:30">12:30 PM</option>
              <option className='court-time' value="13:00">1:00 PM</option>
              <option className='court-time' value="13:30">1:30 PM</option>
              <option className='court-time' value="14:00">2:00 PM</option>
              <option className='court-time' value="14:30">2:30 PM</option>
              <option className='court-time' value="15:00">3:00 PM</option>
              <option className='court-time' value="15:30">3:30 PM</option>
              <option className='court-time' value="16:00">4:00 PM</option>
              <option className='court-time' value="16:30">4:30 PM</option>
              <option className='court-time' value="17:00">5:00 PM</option>
              <option className='court-time' value="17:30">5:30 PM</option>
              <option className='court-time' value="18:00">6:00 PM</option>
              <option className='court-time' value="18:30">6:30 PM</option>
              <option className='court-time' value="19:00">7:00 PM</option>
              <option className='court-time' value="19:30">7:30 PM</option>
              <option className='court-time' value="20:00">8:00 PM</option>
              <option className='court-time' value="20:30">8:30 PM</option>
              <option className='court-time' value="21:00">9:00 PM</option>
              <option className='court-time' value="21:30">9:30 PM</option>
              <option className='court-time' value="22:00">10:00 PM</option>
              <option className='court-time' value="22:30">10:30 PM</option>
              <option className='court-time' value="23:00">11:00 PM</option>
              <option className='court-time' value="23:30">11:30 PM</option>
            </select>
            <strong> Event end time: </strong>
            <select
              className='event-start'
              type="text"
              placeholder='Event start time'
              onChange={this.update('email')} >
              <option className='court-time' value="6:00">6:00 AM</option>
              <option className='court-time' value="6:30">6:30 AM</option>
              <option className='court-time' value="7:00">7:00 AM</option>
              <option className='court-time' value="7:30">7:30 AM</option>
              <option className='court-time' value="8:00">8:00 AM</option>
              <option className='court-time' value="8:30">8:30 AM</option>
              <option className='court-time' value="9:00">9:00 AM</option>
              <option className='court-time' value="9:30">9:30 AM</option>
              <option className='court-time' value="10:00">10:00 AM</option>
              <option className='court-time' value="10:30">10:30 AM</option>
              <option className='court-time' value="11:00">11:00 AM</option>
              <option className='court-time' value="11:30">11:30 AM</option>
              <option className='court-time' value="12:00">12:00 PM</option>
              <option className='court-time' value="12:30">12:30 PM</option>
              <option className='court-time' value="13:00">1:00 PM</option>
              <option className='court-time' value="13:30">1:30 PM</option>
              <option className='court-time' value="14:00">2:00 PM</option>
              <option className='court-time' value="14:30">2:30 PM</option>
              <option className='court-time' value="15:00">3:00 PM</option>
              <option className='court-time' value="15:30">3:30 PM</option>
              <option className='court-time' value="16:00">4:00 PM</option>
              <option className='court-time' value="16:30">4:30 PM</option>
              <option className='court-time' value="17:00">5:00 PM</option>
              <option className='court-time' value="17:30">5:30 PM</option>
              <option className='court-time' value="18:00">6:00 PM</option>
              <option className='court-time' value="18:30">6:30 PM</option>
              <option className='court-time' value="19:00">7:00 PM</option>
              <option className='court-time' value="19:30">7:30 PM</option>
              <option className='court-time' value="20:00">8:00 PM</option>
              <option className='court-time' value="20:30">8:30 PM</option>
              <option className='court-time' value="21:00">9:00 PM</option>
              <option className='court-time' value="21:30">9:30 PM</option>
              <option className='court-time' value="22:00">10:00 PM</option>
              <option className='court-time' value="22:30">10:30 PM</option>
              <option className='court-time' value="23:00">11:00 PM</option>
              <option className='court-time' value="23:30">11:30 PM</option>
            </select>
            <div>
              <input type="color" id="backgroundcolor" name="color" defaultValue="#e66465" />
              <label >Court Sheet Background Color</label>
            </div>
            <div>
              <input type="color" id="textcolor" name="color" defaultValue="#000000"/>
              <label >Court Sheet Text Color</label>
            </div>
            <input
              className='event-color'
              list='colors'
              type="text"
              placeholder='Address for Directions'
              onChange={this.update('address')} />
          <input className='submit-button' type="submit" value="Create Club" />
        </form>
      </div>
    );
  }

}

export default withRouter(EventForm);
