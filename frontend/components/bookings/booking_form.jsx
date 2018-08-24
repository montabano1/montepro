import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';

class BookingForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      start_time: this.props.start_time,
      end_time: this.props.start_time + 2,
      club_id: this.props.club_id,
      court_num: this.props.court_num,
      booked_by_id: this.props.currentUser.id,
      title: ''
    };
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  update() {
	  return (e) => {
	    this.setState({title: e.target.value});
    };
	}
  updateTime() {
	  return (e) => {
	    this.setState({end_time: this.props.start_time + parseInt(e.target.value)});
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

    this.props.createBooking(this.state).then((booking) => {
      this.props.closeModal();
      this.props.history.push(`/court`);
    });}
  }

	render() {
    const ampm = this.props.start_time < 13 ? 'AM' : 'PM';
    const military = this.props.start_time < 15 ? 0 : 12;
    return (
      <div className='booking-form'>
				<div id='booking-header'>
          <h3 >Book "{this.props.name}" at {6 - military + Math.floor(this.props.start_time/2) +
          ':' + String(100 + this.props.start_time % 2 * 30).slice(1) + ampm}</h3>
        </div>
        <div className='errors-div'>{this.renderErrors()}</div>
        <section className='booking-options'>
          <strong> Title: </strong>
          <input
            className='booking-name-input'
            type="text"
            placeholder={` ex. H. Smith or Cardio Tennis`}
            onChange={this.update('title')} />
            <br/>
            <br/>
          <strong> How long would you like to book your court for? </strong>
  				<form onSubmit={this.handleSubmit} className='booking-form-questions'>
            <select className='booking-input' defaultValue="2" onChange={this.updateTime()}>
              <option className= 'time-option' value="1">30 minutes</option>
              <option className= 'time-option' value="2">1 hour</option>
              <option className= 'time-option' value="3">1 hour 30 minutes</option>
              <option className= 'time-option' value="4">2 hours</option>
            </select>
            <input className='submit-book' type="submit" value="Book your Court" />
          </form>
        </section>
      </div>
    );
  }

}

export default withRouter(BookingForm);
