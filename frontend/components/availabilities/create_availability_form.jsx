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

class CreateAvailabilityForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pro_id: this.props.currentUser.id,
      start_time: 0,
      end_time: 0,
      day: 'Sunday',
      club_id: this.props.currentUser.club_id
    };
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    this.props.fetchPros(this.props.currentUser.club_id);
    this.props.fetchAvailabilities(this.props.currentUser.club_id);
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
    if(parseInt(this.state.start_time) >= parseInt(this.state.end_time)) {
      fieldErrors.push('-Please have your availability end after it starts')
    }
    if(fieldErrors.length > 0) {
      this.props.sendErrors(fieldErrors);
    }
    else {
      this.props.createAvailability(this.state).then(()=> {
        window.scrollTo(0, 0)
        this.props.history.push('/Availabilities');
      })
    }
  }

  render() {
    const pros = this.props.pros;
    const proslist = [];
    const prosAvails = {};
    const dayslist = [];
    const availslist = {};
    const printAvails = new Array(pros.length);
    for(let i = 0; i < printAvails.length; i++) {
      printAvails[i] = [];
    }
    pros.forEach((pro) => {
      if(pro.pro_member === 'pro') {
        proslist.push(
          <option className='pro-avail-option' value={pro.id} key={`pro - ${pro.id}`}>{pro.username}</option>
        );
        prosAvails[pro.username] = {Saturday: [], Sunday: [], Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: []};
      }
    })
    if (this.props.prosOb && this.props.avails && this.props.pros) {
      this.props.avails.forEach((avail) => {
        if (this.props.prosOb[avail.pro_id]) {
          prosAvails[this.props.prosOb[avail.pro_id].username][avail.day].push(` ${times[avail.start_time]} - ${times[avail.end_time]}`)
        }
      })
      days.forEach((day, i) => {
        dayslist.push(
          <option className='day-avail-option' value={day} key={`day - ${i}`}>{day}</option>
        );
      })
      pros.forEach((pro) => {
        availslist[pro.username] = []
      })
      const namepros = Object.keys(availslist)
      namepros.forEach((pro)=> {
        days.forEach((day) => {
          if(prosAvails[pro][day].length > 0) {
            availslist[pro].push(`${day}: ${prosAvails[pro][day]}`)
          }
        })
      })
      namepros.forEach((pro, i) => {
        printAvails[i].push([
          <div id={`${pro}-avail-final`} className='avail-show-pro'>
            <strong className='avail-pro-name'>{pro}</strong>
            <button className='avail-show-button' onClick={() => {
              this.props.sendInfo({pro_id: this.props.pros.filter(dude => dude.username === pro)[0].id});
              this.props.openModal('editAvail')
            }}>edit</button>
          </div>
        ])
        if (availslist[pro].length === 0) {
          printAvails[i].push(<div className='daily-avail'><strong>No availabilities yet</strong></div>)
        } else {
          availslist[pro].forEach((avail) => {
            printAvails[i].push(<div className='daily-avail'><strong>{avail}</strong></div>)
          })
        }
      })

    }
    const timeslist = [
      <option className='court-time' key="0" value="0">6:00 AM</option>,
      <option className='court-time' key="1" value="1">6:30 AM</option>,
      <option className='court-time' key="2" value="2">7:00 AM</option>,
      <option className='court-time' key="3" value="3">7:30 AM</option>,
      <option className='court-time' key="4" value="4">8:00 AM</option>,
      <option className='court-time' key="5" value="5">8:30 AM</option>,
      <option className='court-time' key="6" value="6">9:00 AM</option>,
      <option className='court-time' key="7" value="7">9:30 AM</option>,
      <option className='court-time' key="8" value="8">10:00 AM</option>,
      <option className='court-time' key="9" value="9">10:30 AM</option>,
      <option className='court-time' key="10" value="10">11:00 AM</option>,
      <option className='court-time' key="11" value="11">11:30 AM</option>,
      <option className='court-time' key="12" value="12">12:00 PM</option>,
      <option className='court-time' key="13" value="13">12:30 PM</option>,
      <option className='court-time' key="14" value="14">1:00 PM</option>,
      <option className='court-time' key="15" value="15">1:30 PM</option>,
      <option className='court-time' key="16" value="16">2:00 PM</option>,
      <option className='court-time' key="17" value="17">2:30 PM</option>,
      <option className='court-time' key="18" value="18">3:00 PM</option>,
      <option className='court-time' key="19" value="19">3:30 PM</option>,
      <option className='court-time' key="20" value="20">4:00 PM</option>,
      <option className='court-time' key="21" value="21">4:30 PM</option>,
      <option className='court-time' key="22" value="22">5:00 PM</option>,
      <option className='court-time' key="23" value="23">5:30 PM</option>,
      <option className='court-time' key="24" value="24">6:00 PM</option>,
      <option className='court-time' key="25" value="25">6:30 PM</option>,
      <option className='court-time' key="26" value="26">7:00 PM</option>,
      <option className='court-time' key="27" value="27">7:30 PM</option>,
      <option className='court-time' key="28" value="28">8:00 PM</option>,
      <option className='court-time' key="29" value="29">8:30 PM</option>,
      <option className='court-time' key="30" value="30">9:00 PM</option>,
      <option className='court-time' key="31" value="31">9:30 PM</option>,
      <option className='court-time' key="32" value="32">10:00 PM</option>,
      <option className='court-time' key="33" value="33">10:30 PM</option>,
      <option className='court-time' key="34" value="34">11:00 PM</option>,
      <option className='court-time' key="35" value="35">11:30 PM</option>
    ]
    const avail_input = (
      <section className='avail-inputs'>
        <section>
          <strong> Pro: </strong>
          <select
            className='avail-input'
            type="text"
            placeholder={pros[0].username}
            onChange={this.update('pro_id')} >
            {proslist}
          </select>
        </section>
        <section >
          <strong> Day: </strong>
          <select
            className= 'avail-input'
            type="text"
            onChange={this.update('day')} >
            {dayslist}
          </select>
        </section>
        <section>
          <strong> Start time: </strong>
          <select
            className='avail-input'
            type="text"
            defaultValue='0'
            onChange={this.update('start_time')} >
            {timeslist}
          </select>
        </section>
        <section>
          <strong> End time: </strong>
          <select
            className='avail-input'
            type="text"
            onChange={this.update('end_time')} >
            {timeslist}
          </select>
        </section>
      </section>
      )
    return (
      <div className='availability-form'>
				<div id='please-sign-up'>
          <h3 >Create your Pro Availabilities!</h3>
          <div className='event-errors-div'>{this.renderErrors()}</div>
        </div>
        <div className='avails-page'>
          <section className='availability-list'>
            {printAvails}
          </section>
          <form onSubmit={this.handleSubmit} className='avail-items'>
            {avail_input}
            <input className='submit-button-avails' type="submit" value="Create Availability" />
          </form>
        </div>
      </div>
    );
  }

}

export default withRouter(CreateAvailabilityForm);
