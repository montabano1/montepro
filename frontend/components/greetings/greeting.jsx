import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      club: this.props.club
    };
  }
  componentDidMount() {
    this.props.currentUser && this.props.currentUser.club_id != 0 ?
    this.props.fetchClub(this.props.currentUser.club_id) : null
  }
  render() {
    let club_name = Object.values(this.props.club).length >0 &&
    this.props.currentUser &&
    Object.keys(this.props.club).includes(String(this.props.currentUser.club_id))  ?
      this.props.club[this.props.currentUser.club_id].name : "";
    const personalGreeting = () => (
      <hgroup className="header-group">
        <Link to='/'>
          <button className="header-button" onClick={this.props.logout}>Log Out</button>
        </Link>
        &nbsp;&nbsp;
        <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
        <strong className="club-name-header"> {club_name} </strong>
      </hgroup>
    );
    return (
      this.props.currentUser ?
      personalGreeting() :
      null
    );
  }
};

export default Greeting;
