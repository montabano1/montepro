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

class BookingShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      time: this.props.time,
      court_num: this.props.court_num,
      errors: this.props.errors,
      currentUser: this.props.currentUser,
      courts: this.props.courts,
      title: this.props.title,
      bookid: this.props.bookid,
      booked_by_id: this.props.booked_by_id,
      start_time: 36,
      end_time: 0,
      recurring: 'No'
    };
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser(this.state.booked_by_id)
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
    this.props.deleteBooking(this.state.bookid, this.state.recurring).then(() => {
      this.props.closeModal();
      window.scrollTo(0, 0)
      this.props.history.push(`/court/${this.state.date}`);
    })
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
    let name = '';
    let start_time = 36;
    let end_time = 0;
    const date = this.state.date;
    const court_num = this.state.court_num;
    const title = this.state.title;
    const booked_by_id = this.state.booked_by_id;
    if(this.props.date) {
      const samebooker = Object.values(this.props.bookings).filter(book =>
        book.date === date &&
        book.court_num === court_num &&
        book.title === title &&
        book.booked_by_id === booked_by_id
      )
      samebooker.forEach(b => {
        if (b.time < start_time) {
          start_time = b.time;
        }
        if (b.time + 1 > end_time) {
          end_time = b.time + 1;

        }
      })
      if (this.props.users[this.state.booked_by_id]) {
        name = this.props.users[this.state.booked_by_id].username
      }
    }
    const prooption = []
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    if (this.props.currentUser.pro_member === 'pro') {
      prooption.push(
        <section>
          <strong className='pro-option'> Do you want to delete all future events
          on court {this.props.courts[this.props.court_num].name} with title {this.state.title} on {days[new Date(this.state.date).getUTCDay()]}s?
          </strong>
          <select
            className='booking-delete-recurring'
            id='recurring'
            type="text"
            onChange={this.update('recurring')} >
            <option value='No'>No</option>
            <option value='Yes'>Yes</option>
          </select>
        </section>
      )
    }
    return (
      <div className='booking-form'>
				<div id='booking-header'>
          <h3 >Booking Info:</h3>
        </div>
        <form onSubmit={this.handleSubmit} className='cancel-booking'>
          <strong className='book-show-row'> Title: {this.state.title}</strong>
          <strong className='book-show-row'> Booked by: {name}</strong>
          <strong className='book-show-row'> Court: {this.props.courts[this.state.court_num].name}</strong>
          <strong className='book-show-row' id='canceltime' value={`${start_time} - ${end_time}`}> Time: {`${times[start_time]} - ${times[end_time]}`}</strong>
          {prooption}
          <input className='submit-book' type="submit" value="Delete Booking"/>
        </form>
      </div>
    );
  }

}

export default withRouter(BookingShow);
