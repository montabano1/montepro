import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { fetchPros } from '../../actions/user_actions';
import { sendErrors } from '../../actions/session_actions';



class LessonOptions extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      pro_id: 0,
      date: '',
      club_id: this.props.currentUser.club_id,
      pro_name: ''
    };
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }
  componentDidMount() {
    this.props.fetchPros(this.props.currentUser.club_id);
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
    return (e) => {
      if (e.target.value === '/lesson/time') {
        this.props.history.push(e.target.value)
      }
      if (e.target.value === '/lesson/pro'){
        this.toggleHidden()
      }
    }
  }
  update(field) {
	  return (e) => {
	    this.setState({[field]: e.target.value});
    };
	}
  updatePro(name) {
    return (e) => {
      const name = e.target.value.split(',')[1]
      const id = e.target.value.split(',')[0]
      this.setState({pro_name: name, pro_id: id})
    }
  }

  toggleHidden() {
    const x = document.getElementById('proform');
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
      this.props.history.push(`lesson/pro/${this.state.pro_id}-${this.state.date}`);
    }
  }


  render() {
    const today = new Date();
    const proslist = []
    const pros = this.props.pros;
    pros.forEach((pro) => {
      if (pro.id != this.props.currentUser.id) {
        proslist.push(
          <option className='pro-avail-option' value={[pro.id, pro.username]} key={`pro - ${pro.id}`}>{pro.username}</option>
        );
      }
    });
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
            <option value='' label='Please choose' />
            <option value='/lesson/pro' label='Book by Pro' />
            <option value='/lesson/time' label='Book by Time/Day' />
          </select>
        </div>
        <form
        onSubmit={this.handleSubmit}
        id='proform'
        className='form-items hidden'>
          <div className='event-errors-div'>{this.renderErrors()}</div>
          <strong className='pro-choose'>Choose your pro: </strong>
          <select
            className='choose-option-input'
            id='choices'
            type="text"
            onChange={this.updatePro()}
            >
            <option value='' label='Please choose your pro' />
            {proslist}
          </select>
          <strong className='pro-choose'> Choose date: </strong>
          <input
          className= 'lesson-date-input'
          id='prodate'
          type="date"
          onChange={this.update('date')}
          />
          <input className='lesson-submit-button' type="submit" value="Search Availabilities" />
        </form>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.id],
    pros: Object.values(state.entities.users),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPros: (id) => dispatch(fetchPros(id)),
    sendErrors: (errors) => dispatch(sendErrors(errors)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LessonOptions)
