import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { fetchPros } from '../../actions/user_actions';
import { fetchCourts } from '../../actions/court_actions';
import { sendErrors } from '../../actions/session_actions';
import { fetchAvailabilities } from '../../actions/availability_actions';
import { fetchBookings, createBookings } from '../../actions/booking_actions';



class LessonOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pro_id: 0,
      date: '',
      club_id: this.props.currentUser.club_id,
      pro_name: '',
      end_time: '2',
      sport: 'Tennis',
      time: 0,
      court_num: 0,
    };
    this.toggled = false;
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }
  componentDidMount() {
    this.props.fetchCourts(this.props.currentUser.club_id);
    this.props.fetchPros(this.props.currentUser.club_id);
    this.props.fetchAvailabilities(this.props.currentUser.club_id);
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
  updateChoice() {
    const today = new Date();
    return (e) => {
      if (e.target.value === '/lesson/time') {
        this.props.history.push(`/lesson/time/${today.getFullYear()}-${(today.getMonth() + 101).toString().slice(1)}-${(today.getDate() + 100).toString().slice(1)}`)
      }
      if (e.target.value === '/lesson/pro'){
        this.toggleHidden('proform')
      }
    }
  }
  update(field) {
	  return (e) => {
	    this.setState({[field]: e.target.value});
    };
	}
  updateDate(field) {
	  return (e) => {
      if(this.state.pro_id != 0 && !this.toggled) {
        this.toggled = true
        this.toggleHidden('avails-list')
      };
      this.setState({[field]: e.target.value})
      this.props.fetchBookings(this.props.currentUser.club_id, e.target.value);
    };
	}
  updatePro(name) {
    return (e) => {
      const name = e.target.value.split(',')[1]
      const id = e.target.value.split(',')[0]
      this.setState({pro_name: name, pro_id: id})
    }
  }

  toggleHidden(id) {
    const x = document.getElementById(id);
    if (x) {
      x.classList.toggle('hidden')
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const fieldErrors = [];
    if (document.getElementById('choices').value === '/lesson/pro') {
      if(this.state.pro_name.length === 0) {
        fieldErrors.push([`-Please choose a pro`])
      }
      if(this.state.date.length === 0) {
        fieldErrors.push([`-Please enter a date to check ${this.state.pro_name}'s availabilities`])
      }
    }
    if(fieldErrors.length > 0) {
      this.props.sendErrors(fieldErrors);
    }
    else {
      const last_name = this.props.currentUser.username.split(' ')[this.props.currentUser.username.split(' ').length - 1]
      this.props.createBookings({
        date: this.state.date,
        time: this.state.time,
        club_id: this.props.currentUser.club_id,
        court_num: this.state.court_num,
        booked_by_id: this.props.currentUser.id,
        title: `${last_name} lesson with ${this.props.prosOb[parseInt(this.state.pro_id)].username}`,
        end_time: this.state.end_time,
        event_type: 'lesson',
        pro_id: this.state.pro_id
      }).then(() => {
        window.scrollTo(0, 0)
        this.props.history.push(`/court/${this.state.date}`);
      })
    }
  }


  render() {
    const sports = []
    this.props.courts.forEach(court=> {
      if (!sports.includes(court.court_type)) {
        sports.push(court.court_type);
      }
    })
    const sportslist = []
    sports.forEach(sp => {
      sportslist.push(<option value={sp} >{sp}</option>)
    })
    const avail_courts = []
    let timeslist = []
    const proslist = []
    const pros = this.props.pros;
    pros.forEach((pro) => {
      if (pro.id != this.props.currentUser.id) {
        proslist.push(
          <option className='pro-avail-option' value={[pro.id, pro.username]} key={`pro - ${pro.id}`}>{pro.username}</option>
        );
      }
    });
    if (this.state.pro_id != 0 && this.state.date != '') {
      const arrtimes = ['6:00 AM','6:30 AM','7:00 AM','7:30 AM','8:00 AM','8:30 AM',
      '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM',
      '12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM',
      '4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM',
      '7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM','10:30 PM',
      '11:00 PM','11:30 PM'
      ]
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const today = days[new Date(this.state.date).getUTCDay()];
      const avails = Object.values(this.props.avails).filter(ava => ava.day === today && ava.pro_id === parseInt(this.state.pro_id))
      const court_booked = {}
      let times = []
      const pro_booked = []
      const court_booked_ids = {}
      avails.forEach(avail => {
        for(let i = avail.start_time; i <= avail.end_time; i++) {
          times.push(i);
        }
      })
      const pro_id = parseInt(this.state.pro_id)
      Object.values(this.props.bookings).forEach(book => {
        if(book.pro_id === pro_id) {
          pro_booked.push(book.time)
        }
        if(court_booked[book.time]) {
          court_booked[book.time] += 1
          court_booked_ids[book.time].push(book.court_num)
        }
        else {
          court_booked[book.time] = 1;
          court_booked_ids[book.time] = [book.court_num]
        }
      })
      const sport_courts = this.props.courts.filter(court => court.court_type === this.state.sport).length
      const end_time = parseInt(this.state.end_time)
      arrtimes.forEach((time, k) => {
        let possible = true;
        for(let j = k; j <= k + end_time; j++) {
          if (!times.includes(j) || pro_booked.includes(j) || court_booked[k] === sport_courts) {
            possible = false
          }
        }
        if (possible) {
          timeslist.push(<option value={k}>{`${time} - ${arrtimes[parseInt(end_time)+ k]}`}</option>)
        }
      })
      let chosentime = parseInt(document.getElementById('avails-time-list').value) || 0
      if(!court_booked_ids[chosentime]) {
        court_booked_ids[chosentime] = []
      }
      this.props.courts.filter(court => court.court_type === this.state.sport).forEach(court => {
        if (!court_booked_ids[chosentime].includes(court.id)) {
          avail_courts.push(<option value={court.id} >{court.name}</option>)
        }
      })
      if (timeslist.length === 0) {
        timeslist = <option value=''>{`${this.props.prosOb[pro_id].username} not available`}</option>
      }

    }



    return (
      <main className='pro-options'>
        <section className='options-heading'>
          <strong className='pro-choose'>Book by pro or by time?</strong>
        </section>

        <div>
          <select
            className='choose-option-input'
            id='choices'
            type="text"
            onChange={this.updateChoice()}>
            <option value='' >Please choose</option>
            <option value='/lesson/pro' >Book by Pro</option>
            <option value='/lesson/time' >Book by Time/Day</option>
          </select>
        </div>
        <form
        onSubmit={this.handleSubmit}
        id='proform'
        className='lesson-items hidden'>
          <div className='event-errors-div'>{this.renderErrors()}</div>
          <strong className='pro-choose'>Choose your pro: </strong>
          <select
            className='choose-option-input'
            id='choices'
            type="text"
            onChange={this.updatePro()}
            >
            <option value=''>Please choose your pro</option>
            {proslist}
          </select>
          <strong className='pro-choose'>Choose your sport: </strong>
          <select
            className='choose-option-input'
            id='choices'
            type="text"
            onChange={this.update('sport')}
            >
            {sportslist}
          </select>
          <strong className='pro-choose'> Choose date: </strong>
          <input
          className= 'lesson-date-input'
          id='prodate'
          type="date"
          onChange={this.updateDate('date')}
          />
          <div id='avails-list' className='avails-list hidden'>
            <strong className='pro-choose'> How long would you like to book your lesson for? </strong>
            <br/>
            <select
            id='booking-amt'
            className='lesson-booking-input'
            defaultValue='2'
            onChange={this.update('end_time')}>
              <option className= 'time-option' value="1">30 minutes</option>
              <option className= 'time-option' value="2">1 hour</option>
              <option className= 'time-option' value="3">1 hour 30 minutes</option>
            </select>
            <select id='avails-time-list' className='lesson-booking-input' onChange={this.update('time')}>
              <option value=''>Choose time</option>
              {timeslist}
            </select>
            <br/>
            <select
            className='lesson-booking-input'
            onChange={this.update('court_num')}>
              <option value=''>Choose court</option>
              {avail_courts}
            </select>
          </div>
          <input id='submit-button' className='lesson-submit-button' type="submit" value="Book your lesson" />
        </form>
      </main>
    )
  }
}

const mapStateToProps = state => {
  const courts = Object.values(state.entities.courts).sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return {
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id],
    pros: Object.values(state.entities.users),
    prosOb: state.entities.users,
    avails: state.entities.availabilities,
    bookings: state.entities.bookings,
    courts: courts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPros: (id) => dispatch(fetchPros(id)),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
    fetchBookings: (id, date) => dispatch(fetchBookings(id, date)),
    createBookings: (bookings) => dispatch(createBookings(bookings)),
    fetchCourts: (id) => dispatch(fetchCourts(id)),
    fetchAvailabilities: (id) => dispatch(fetchAvailabilities(id)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LessonOptions)
