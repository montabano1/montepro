import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';

class CourtSetup extends React.Component {

  constructor(props) {
    super(props);
    this.courts = new Array(this.props.court_amt);
    for(let i=0; i < this.props.court_amt; i++) {
      this.courts[i] = {name: "", court_type: "Tennis", club_id: this.props.club_id};
    }
    this.state = {
      courts: this.courts
    };
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

	update(field, i) {
	  return (e) => {
      this.courts[i][field] = e.target.value;
	    this.setState({courts: this.courts});
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

  componentDidMount() {
    this.props.fetchClub(this.props.currentUser.club_id);
  }

	handleSubmit(e) {
    e.preventDefault();
    const fieldErrors = [];
    for(let i=0; i < this.props.court_amt; i++) {
      if(this.state.courts[i].name.length === 0) {
        fieldErrors.push(`Please enter name for Court ${i+1}`);
      }
      if(this.state.courts[i].court_type.length === 0) {
        fieldErrors.push(`Please enter type for Court ${i+1}`);
      }
    }
    if(fieldErrors.length > 0) {
      this.props.sendErrors(fieldErrors);
    } else {
      debugger
      for(let i=0; i < this.props.court_amt; i++) {
        this.props.createCourt(this.state.courts[i]).then(() => {
          let wait;
        });
      }
    }
    this.props.editUser(Object.assign({}, this.props.currentUser, {authorized: 'true'})).then((user) => {
      this.props.history.push(`/options/pro`);
    });
  }

	render() {
    const courtsetup = []
    for(let i = 0; i < this.props.court_amt; i++) {
      courtsetup.push(
        <div className='court-setup-ind' key={i}>
          <strong className='court-num'> Court {i+1} </strong>
          <input
            className='court-name-input'
            type="text"
            placeholder={` e.g Paddle ${i+1}`}
            onChange={this.update('name', i)} />
          <select className='court-type-input'
              type="text"
              list="types"
              placeholder="Court Type"
              onChange={this.update('court_type', i)} >
            <option value="Tennis"> Tennis</option>
            <option value="Paddle">Paddle</option>
            <option value="Pickleball">Pickleball</option>
            <option value="Other">Other</option>
          </select>
        </div>
      )
    }
    return (
      this.props.currentUser.authorized === 'true' ? <Redirect to="/options/pro" /> :
      <div className='court-setup-form'>
				<div id='please-sign-up'>
          <h3 className='setup-courts'>Setup your courts</h3>
        </div>
        <div className='errors-div'>{this.renderErrors()}</div>
        <div className='titles'>
          <strong className='court-name'>Court Name</strong>
          <strong className='court-type'>Court Type</strong>
        </div>
				<form onSubmit={this.handleSubmit} className='court-setup'>
            {courtsetup}
          <input className='submit-courts' type="submit" value="Setup Courts" />
        </form>
      </div>
    );
  }

}

export default withRouter(CourtSetup);
