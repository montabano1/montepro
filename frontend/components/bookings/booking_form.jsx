import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { merge } from 'lodash';


const times = ['6:00 AM','6:30 AM','7:00 AM','7:30 AM','8:00 AM','8:30 AM',
'9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM',
'12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM',
'4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM',
'7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM','10:30 PM',
'11:00 PM','11:30 PM'
]

class BookingForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      time: this.props.time,
      club_id: this.props.club_id,
      court_num: this.props.court_num,
      booked_by_id: this.props.currentUser.id,
      title: '',
      end_time: '2'
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
    const booking_amt = parseInt(document.getElementById('booking-amt').value);
    const bookings = Object.values(this.props.bookings)
    bookings.forEach((booking) => {
      if(this.state.time <= booking.time && this.state.time + booking_amt - 1 >= booking.time &&
         this.state.court_num === booking.court_num) {
          fieldErrors.push([`-Court "${this.props.courts[booking.court_num].name}" is already  booked at ${times[booking.time]}`]);
        }
    })
    if (this.props.already + parseInt(this.state.end_time) > 4) {
      fieldErrors.push(['-You have reached the maximum booked court hours for today (2 hours)'])
    }
    debugger
    if(fieldErrors.length > 0) {
      this.props.sendErrors(fieldErrors);
    }
    else {
      const booking_amt = document.getElementById('booking-amt').value;
      this.props.createBookings(this.state).then(() => {
        this.props.closeModal();
        window.scrollTo(0, 0)
        this.props.history.push(`/court/${this.state.date}`);
      })
    }
  }

	render() {
    const times = ['6:00 AM','6:30 AM','7:00 AM','7:30 AM','8:00 AM','8:30 AM',
    '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM',
    '12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM',
    '4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM',
    '7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM','10:30 PM',
    '11:00 PM','11:30 PM'
    ]
    const ampm = this.props.time < 13 ? 'AM' : 'PM';
    const military = this.props.time < 15 ? 0 : 12;
    return (
      <div className='booking-form'>
				<div id='booking-header'>
          <h3 >Book "{this.props.name}" at {6 - military + Math.floor(this.props.time/2) +
          ':' + String(100 + this.props.time % 2 * 30).slice(1) + ampm}</h3>
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
            <select
            id='booking-amt'
            className='booking-input'
            defaultValue="2"
            onChange={this.update('end_time')}>
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
