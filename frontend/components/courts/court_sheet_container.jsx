import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchCourts, sendInfo } from '../../actions/court_actions';
import { fetchBookings } from '../../actions/booking_actions';
import { openModal } from '../../actions/modal_actions';



class CourtSheetContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      courttype: 'Tennis',
      courts: this.props.courts,
      bookings: this.props.bookings
    };
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
      this.props.history.push(`/court/${e.target.value}`)
	  };
	}

  componentDidMount() {
    this.props.fetchCourts(this.props.currentUser.club_id);
    this.props.fetchBookings(this.props.currentUser.club_id, this.state.date)
  }
  render() {
    const arrtimes = ['6:00 AM','6:30 AM','7:00 AM','7:30 AM','8:00 AM','8:30 AM',
    '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM',
    '12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM',
    '4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM',
    '7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM','10:30 PM',
    '11:00 PM','11:30 PM'
    ]
    const errorslist = []
    if(this.props.errors) {
      Object.values(this.props.errors).forEach(e => {
        let temp = e.message.split(')')[0].slice(1).split(',');
        errorslist.push(
            <strong className='court-list-error'>{`-${this.props.courtsOb[parseInt(temp[2].slice(1))].name} is already booked on ${temp[1]} at ${arrtimes[parseInt(temp[0])]}`}</strong>
          )
      })
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const times = (
      <div className='court-day' > Time  \  Court:
        <div className='court-time' key="6:00" value="6:00">6:00 AM</div>
        <div className='court-time' key="6:30" value="6:30">6:30 AM</div>
        <div className='court-time' key="7:00" value="7:00">7:00 AM</div>
        <div className='court-time' key="7:30" value="7:30">7:30 AM</div>
        <div className='court-time' key="8:00" value="8:00">8:00 AM</div>
        <div className='court-time' key="8:30" value="8:30">8:30 AM</div>
        <div className='court-time' key="9:00" value="9:00">9:00 AM</div>
        <div className='court-time' key="9:30" value="9:30">9:30 AM</div>
        <div className='court-time' key="10:00" value="10:00">10:00 AM</div>
        <div className='court-time' key="10:30" value="10:30">10:30 AM</div>
        <div className='court-time' key="11:00" value="11:00">11:00 AM</div>
        <div className='court-time' key="11:30" value="11:30">11:30 AM</div>
        <div className='court-time' key="12:00" value="12:00">12:00 PM</div>
        <div className='court-time' key="12:30" value="12:30">12:30 PM</div>
        <div className='court-time' key="13:00" value="13:00">1:00 PM</div>
        <div className='court-time' key="13:30" value="13:30">1:30 PM</div>
        <div className='court-time' key="14:00" value="14:00">2:00 PM</div>
        <div className='court-time' key="14:30" value="14:30">2:30 PM</div>
        <div className='court-time' key="15:00" value="15:00">3:00 PM</div>
        <div className='court-time' key="15:30" value="15:30">3:30 PM</div>
        <div className='court-time' key="16:00" value="16:00">4:00 PM</div>
        <div className='court-time' key="16:30" value="16:30">4:30 PM</div>
        <div className='court-time' key="17:00" value="17:00">5:00 PM</div>
        <div className='court-time' key="17:30" value="17:30">5:30 PM</div>
        <div className='court-time' key="18:00" value="18:00">6:00 PM</div>
        <div className='court-time' key="18:30" value="18:30">6:30 PM</div>
        <div className='court-time' key="19:00" value="19:00">7:00 PM</div>
        <div className='court-time' key="19:30" value="19:30">7:30 PM</div>
        <div className='court-time' key="20:00" value="20:00">8:00 PM</div>
        <div className='court-time' key="20:30" value="20:30">8:30 PM</div>
        <div className='court-time' key="21:00" value="21:00">9:00 PM</div>
        <div className='court-time' key="21:30" value="21:30">9:30 PM</div>
        <div className='court-time' key="22:00" value="22:00">10:00 PM</div>
        <div className='court-time' key="22:30" value="22:30">10:30 PM</div>
        <div className='court-time' key="23:00" value="23:00">11:00 PM</div>
        <div className='court-time' key="23:30" value="23:30">11:30 PM</div>
      </div>
    );

    const filtered_courts = []
    for(let i = 0; i < this.props.courts.length; i++) {
      if(this.state.courttype === 'all' || this.props.courts[i].court_type === this.state.courttype) {
        filtered_courts.push(this.props.courts[i]);
      }
    }
    let user_booked = 0
    this.props.bookings.forEach((b) => {
      if (b.booked_by_id === this.props.currentUser.id) {
        user_booked += 1;
      }
    })
    let court_divs = [];
    for(let j = 0; j < filtered_courts.length; j++) {
      court_divs.push([]);
      for(let i=0; i < 36; i++) {
        court_divs[j].push(
          <div className='not-booked' key={i}
          onClick={() => {
            this.props.sendInfo({
              date: this.state.date,
              time: i,
              club_id: this.props.currentUser.club_id,
              court_num: filtered_courts[j].id,
              name: filtered_courts[j].name,
              already: user_booked
            });
            this.props.openModal('Book');
          }}
          />
        )
      }
    }
    const bookings = this.props.bookings;
    for(let j=0; j < bookings.length; j++) {
      for(let k=0; k < filtered_courts.length; k++) {
        if(filtered_courts[k].id === bookings[j].court_num) {
          if(this.props.currentUser.pro_member === 'member' && bookings[j].booked_by_id != this.props.currentUser.id) {
            court_divs[k][parseInt(bookings[j].time)] = <div className='booked' key={`${k}-${j}`}>{bookings[j].title}</div>;
          }
          else {
            court_divs[k][parseInt(bookings[j].time)] =
            <div
              className='booked'
              key={`${k}-${j}`}
              onClick={() => {
                this.props.openModal('showbook');
                this.props.sendInfo({
                  booked_by_id: bookings[j].booked_by_id,
                  court_num: bookings[j].court_num,
                  date: this.state.date,
                  title: bookings[j].title,
                  time: bookings[j].time,
                  bookid: bookings[j].id
                })
              }}>
              {bookings[j].title}
            </div>
          }
        }
      }
    }
    const club_courts = filtered_courts.map((court, i) => {
      name = court.name || `Court ${i+1}`
      return (
        <div className='court-column' key={court.id}>{name}
          {court_divs[i]}
        </div>
      )
    });
    return (
      <div>
        <section className='choose-court'>
          <strong className='court-option'>Date: </strong>
          <section className='court-date'>
            <input
              type="date"
              defaultValue={this.state.date}
              onChange={this.updateDate('date').bind(this)}
              />
          </ section >
          <strong className='court-option'>Choose court type: </strong>
          <select className='court-select' onChange={this.update('courttype')}
          defaultValue='Tennis'>
            <option value="all">All courts</option>
            <option value="Tennis">Tennis</option>
            <option value="Paddle">Paddle</option>
            <option value="Pickleball">Pickleball</option>
            <option value="Other">Other</option>
          </select>
        </section>
        <section className='court-sheet-errors'>
          {errorslist}
        </section>
        <strong className='weekday'>{days[new Date(this.state.date).getUTCDay()]}</strong>
        <main className='court-sheet'>
          {times}
          {club_courts}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
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
  let bookings = [];
  if(state.entities.bookings.bookings) {bookings = Object.values(state.entities.bookings.bookings)}
  return {
    bookings: bookings,
    courts: courts,
    courtsOb: state.entities.courts,
    currentUser: state.entities.users[state.session.id],
    date: ownProps.location.pathname.split('/')[ownProps.location.pathname.split('/').length -1],
    errors: state.entities.bookings.errors
  };
};

const mapDispatchToProps = dispatch => {
  return{
    fetchCourts: (id) => dispatch(fetchCourts(id)),
    sendInfo: (info) => dispatch(sendInfo(info)),
    fetchBookings: (id, date) => dispatch(fetchBookings(id, date)),
    openModal: modal => dispatch(openModal(modal)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourtSheetContainer)
