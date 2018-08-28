import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { merge } from 'lodash'

const times = ['6:00 AM','6:30 AM','7:00 AM','7:30 AM','8:00 AM','8:30 AM',
'9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM',
'12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM',
'4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM',
'7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM','10:30 PM',
'11:00 PM','11:30 PM'
]
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class EventForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      start_time: 0,
      end_time: 0,
      club_id: this.props.currentUser.club_id,
      title: '',
      maxppl: 4,
      registerable: 'yes',
      event_type: 'adult clinic',
    };
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    this.props.fetchPros(this.props.currentUser.club_id);
    this.props.fetchCourts(this.props.currentUser.club_id);
  }

  update(field) {
	  return (e) => {
	    this.setState({[field]: e.target.value});
    };
	}
  updateDate() {
	  return (e) => {
	    this.setState({date: e.target.value});
      this.props.fetchBookings(this.props.currentUser.club_id, e.target.value);
	  };
	}

  toggleHidden() {
    const x = document.getElementById('weekdays');
    if (x) {
      x.classList.toggle('hidden')
    }
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
    const confirmedpros = [];
    document.getElementsByName('prosselected').forEach((pro) => {
      if(pro.checked) {
        confirmedpros.push(pro.value)
      }
    });
    const confirmedcourts = [];
    document.getElementsByName('courtsselected').forEach((court) => {
      if(court.checked) {
        confirmedcourts.push(court.value)
      }
    });
    const confirmeddays = [];
    document.getElementsByName('daysselected').forEach((day) => {
      if(day.checked) {
        confirmeddays.push(day.value)
      }
    });
    if(this.state.title.length === 0) {
      fieldErrors.push('-Please enter a title for your event')
    }
    if(this.state.date.length === 0) {
      fieldErrors.push('-Please enter a date for your event')
    }
    if(parseInt(this.state.start_time) >= parseInt(this.state.end_time)) {
      fieldErrors.push('-Please have your event end after it starts')
    }
    const recur = document.getElementById('recurring').value
    if(recur === 'Yes' && confirmeddays.length === 0) {
      fieldErrors.push('-Please choose recurring days')
    }
    let recdate = document.getElementById('recurringdate').value
    if(recdate.length === 0 && recur === 'Yes') {
      fieldErrors.push('-Please choose stop date of recursion')
    }
    const bookings = Object.values(this.props.bookings)
    bookings.forEach((booking) => {
      confirmedcourts.forEach((court) => {
        if(((booking.time <= this.state.end_time && booking.time >= this.state.start_time) &&
        parseInt(court) === booking.court_num)) {
          fieldErrors.push([`-Court "${this.props.courtsCheck[booking.court_num].name}" is already  booked at ${times[booking.time]}`]);
        }
      })
    })

    if(fieldErrors.length > 0) {
      this.props.sendErrors(fieldErrors);
    }
    else {
      if (recur === 'No') {
        confirmeddays.push(days[new Date(this.state.date).getUTCDay()]);
        recdate = this.state.date
      }
      this.props.createEvent(this.state).then(() => {
        confirmedcourts.forEach((court) => {
          confirmeddays.forEach((day)=> {
            this.props.createBookings(merge({}, this.state, {
              booked_by_id: this.props.currentUser.id,
              day: day,
              court_num: parseInt(court),
              recd: recdate,
              event_type: this.state.event_type
            }))
          })
        })
        window.scrollTo(0, 0)
        this.props.history.push(`/court/${this.state.date}`);
      })
    }
  }

  render() {
    const pros = this.props.pros;
    const proscheckbox = [];
    pros.forEach((pro) => {
      if (pro.pro_member === 'pro') {
        proscheckbox.push(
        <div key={pro.id} className='checkbox-item'>
          <input className='procheckbox' type="checkbox" id={pro.id} key={`${pro.id} - box`} name="prosselected" value={pro.id}/>
          <label className='proname' key={`${pro.id} - name`}>{pro.username}</label>
        </div>
        );
      }
    })
    const courts = this.props.courts;
    const courtscheckbox = [];
    courts.forEach((court) => {
      courtscheckbox.push(
        <div key={court.id} className='checkbox-item'>
          <input className='procheckbox' type="checkbox" id={court.id} key={`${court.id} - box`} name="courtsselected" value={court.id}/>
          <label className='proname' key={`${court.id} - name`}>{court.name}</label>
        </div>
      );
    })

    const dayscheckbox = [];
    days.forEach((day, i) => {
      dayscheckbox.push(
        <div key={day} className='checkbox-item'>
          <input className='procheckbox' type="checkbox" id={day} key={`${day} - box`}
          name="daysselected" value={day} />
          <label className='proname' key={`${day} - name`}>{day}</label>
        </div>
      );
    })

    return (
      <div className='event-form'>
				<div id='please-sign-up'>
          <h3 >Create your Event!</h3>
          <div className='event-errors-div'>{this.renderErrors()}</div>
        </div>

				<form onSubmit={this.handleSubmit} className='form-items'>
          <section className='event-inputs'>
            <section>
              <strong> Title: </strong>
              <input
                className='event-title'
                type="text"
                placeholder='ex. Cardio Tennis or Smith Event'
                onChange={this.update('title')} />
            </section>
            <section className='event-date'>
              <strong> Date: </strong>
              <input
              className= 'event-date-input'
              type="date"
              onChange={this.updateDate('date').bind(this)} />
            </section>
            <section>
              <strong> Event Type: </strong>
              <select
                className='event-type'
                onChange={this.update('event_type')} >
                <option value='adult clinic'>Adult Clinic</option>
                <option value='kids clinic'>Kids Clinic</option>
                <option value='tournament'>Tournament</option>
                <option value='match'>Match</option>
                <option value='member event'>Member Event</option>
                <option value='other'>Other</option>
              </select>
            </section>
            <section>
              <strong> Can members register?  </strong>
              <select
                className='event-register'
                type="text"
                onChange={this.update('registerable')} >
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </section>
            <section>
              <strong> Max number of registrants: </strong>
              <input
                className='event-max'
                type="number"
                defaultValue='4'
                onChange={this.update('maxppl')} />
            </section>
            <section>
              <strong> Event start time: </strong>
              <select
                className='event-type'
                type="text"
                placeholder='Event start time'
                onChange={this.update('start_time')} >
                <option className='court-time' value="0">6:00 AM</option>
                <option className='court-time' value="1">6:30 AM</option>
                <option className='court-time' value="2">7:00 AM</option>
                <option className='court-time' value="3">7:30 AM</option>
                <option className='court-time' value="4">8:00 AM</option>
                <option className='court-time' value="5">8:30 AM</option>
                <option className='court-time' value="6">9:00 AM</option>
                <option className='court-time' value="7">9:30 AM</option>
                <option className='court-time' value="8">10:00 AM</option>
                <option className='court-time' value="9">10:30 AM</option>
                <option className='court-time' value="10">11:00 AM</option>
                <option className='court-time' value="11">11:30 AM</option>
                <option className='court-time' value="12">12:00 PM</option>
                <option className='court-time' value="13">12:30 PM</option>
                <option className='court-time' value="14">1:00 PM</option>
                <option className='court-time' value="15">1:30 PM</option>
                <option className='court-time' value="16">2:00 PM</option>
                <option className='court-time' value="17">2:30 PM</option>
                <option className='court-time' value="18">3:00 PM</option>
                <option className='court-time' value="19">3:30 PM</option>
                <option className='court-time' value="20">4:00 PM</option>
                <option className='court-time' value="21">4:30 PM</option>
                <option className='court-time' value="22">5:00 PM</option>
                <option className='court-time' value="23">5:30 PM</option>
                <option className='court-time' value="24">6:00 PM</option>
                <option className='court-time' value="25">6:30 PM</option>
                <option className='court-time' value="26">7:00 PM</option>
                <option className='court-time' value="27">7:30 PM</option>
                <option className='court-time' value="28">8:00 PM</option>
                <option className='court-time' value="29">8:30 PM</option>
                <option className='court-time' value="30">9:00 PM</option>
                <option className='court-time' value="31">9:30 PM</option>
                <option className='court-time' value="32">10:00 PM</option>
                <option className='court-time' value="33">10:30 PM</option>
                <option className='court-time' value="34">11:00 PM</option>
                <option className='court-time' value="35">11:30 PM</option>
              </select>
            </section>
            <section>
              <strong> Event end time: </strong>
              <select
                className='event-type'
                type="text"
                placeholder='Event start time'
                onChange={this.update('end_time')} >
                <option className='court-time' value="0">6:00 AM</option>
                <option className='court-time' value="1">6:30 AM</option>
                <option className='court-time' value="2">7:00 AM</option>
                <option className='court-time' value="3">7:30 AM</option>
                <option className='court-time' value="4">8:00 AM</option>
                <option className='court-time' value="5">8:30 AM</option>
                <option className='court-time' value="6">9:00 AM</option>
                <option className='court-time' value="7">9:30 AM</option>
                <option className='court-time' value="8">10:00 AM</option>
                <option className='court-time' value="9">10:30 AM</option>
                <option className='court-time' value="10">11:00 AM</option>
                <option className='court-time' value="11">11:30 AM</option>
                <option className='court-time' value="12">12:00 PM</option>
                <option className='court-time' value="13">12:30 PM</option>
                <option className='court-time' value="14">1:00 PM</option>
                <option className='court-time' value="15">1:30 PM</option>
                <option className='court-time' value="16">2:00 PM</option>
                <option className='court-time' value="17">2:30 PM</option>
                <option className='court-time' value="18">3:00 PM</option>
                <option className='court-time' value="19">3:30 PM</option>
                <option className='court-time' value="20">4:00 PM</option>
                <option className='court-time' value="21">4:30 PM</option>
                <option className='court-time' value="22">5:00 PM</option>
                <option className='court-time' value="23">5:30 PM</option>
                <option className='court-time' value="24">6:00 PM</option>
                <option className='court-time' value="25">6:30 PM</option>
                <option className='court-time' value="26">7:00 PM</option>
                <option className='court-time' value="27">7:30 PM</option>
                <option className='court-time' value="28">8:00 PM</option>
                <option className='court-time' value="29">8:30 PM</option>
                <option className='court-time' value="30">9:00 PM</option>
                <option className='court-time' value="31">9:30 PM</option>
                <option className='court-time' value="32">10:00 PM</option>
                <option className='court-time' value="33">10:30 PM</option>
                <option className='court-time' value="34">11:00 PM</option>
                <option className='court-time' value="35">11:30 PM</option>
              </select>
            </section>
          </section>
          <section className='checkboxes'>
            <section className='pros-checkbox-area'>
              <strong> Pros teaching: </strong>
              <div className='checkbox-list'>
                {proscheckbox}
              </div>
            </section>
            <section className='pros-checkbox-area'>
              <strong> Book courts: </strong>
              <div className='checkbox-list'>
                {courtscheckbox}
              </div>
            </section>
            <section>
              <strong> Recurring event?  </strong>
              <select
                className='event-register'
                id='recurring'
                type="text"
                onChange={this.toggleHidden} >
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
              </select>
            </section>
            <section id='weekdays' className='days-checkbox-area hidden'>
              <section className='pros-checkbox-area'>
                <strong> Choose days: </strong>
                <div className='checkbox-list'>
                  {dayscheckbox}
                </div>
                <strong> Choose last day: </strong>
                <input
                className= 'event-date-input'
                id='recurringdate'
                type="date" />
              </section>
            </section>
          </section>

          <input className='submit-button' type="submit" value="Create Event" />
        </form>
      </div>
    );
  }

}

export default withRouter(EventForm);
