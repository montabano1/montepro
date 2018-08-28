import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';

class LessonOptions extends React.Component {

  updateChoice() {
    return (e) => {
      this.props.history.push(e.target.value)
    }
  }

  render() {
    const today = new Date();
    return (
      <main className='pro-options'>
        <section className='options-heading'>
          Book by pro or by time?
        </section>

        <div>
          <select
            className='choose-option-input'
            type="text"
            onChange={this.updateChoice()}>
            <option value='' label='Please choose' />
            <option value='/lesson/pro' label='Book by Pro' />
            <option value='/lesson/time' label='Book by Time/Day' />
          </select>
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = dispatch => {
}
export default connect(mapStateToProps, mapDispatchToProps)(LessonOptions)
