import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginContainer from '../session/login_container';
import SignupContainer from '../session/signup_container';
import ClubRegisterContainer from '../clubs/club_register_container';
import ClubJoinContainer from '../clubs/club_join_container';
import BookingShowContainer from '../bookings/booking_show_container';
import BookingFormContainer from '../bookings/booking_form_container';
import EditAvailabilitiesContainer from '../availabilities/edit_availabilities_container';
import LessonTimeFormContainer from '../lessons/lesson_time_form_container';

function Modal({modal, closeModal}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {

    case 'login':
      component = <LoginContainer className='modal-child-container'/>;
      break;
    case 'signup':
      component = <SignupContainer className='modal-child-container'/>;
      break;
    case 'ClubRegister':
      component = <ClubRegisterContainer className='modal-child-container'/>;
      break;
    case 'ClubJoin':
      component = <ClubJoinContainer className='modal-child-container'/>;
      break;
    case 'Book':
      component = <BookingFormContainer className='modal-child-container'/>;
      break;
    case 'LessonTime':
      component = <LessonTimeFormContainer className='modal-child-container'/>;
      break;
    case 'showbook':
      component = <BookingShowContainer className='modal-child-container'/>;
      break;
    case 'editAvail':
      component = <EditAvailabilitiesContainer className='modal-child-container'/>;
      break;
    case 'loading':
      component = <div className='loading'>
                    <div className='loader'/>
                    <span className='loading-text'> loading, please wait... </span>
                  </div>
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {

  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      window.scrollTo(0,0);
      dispatch(closeModal())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
