import * as APIUtil from '../util/court_api_util';
export const RECEIVE_COURT = 'RECEIVE_COURT';
export const RECEIVE_COURTS = 'RECEIVE_COURTS';
export const SEND_INFO = 'SEND_INFO';

export const sendInfo = info => {
  return {
    type: SEND_INFO,
    info
  };
};
export const receiveCourt = court => {
  return {
    type: RECEIVE_COURT,
    court
  };
};

export const receiveCourts = courts => {
  return {
    type: RECEIVE_COURTS,
    courts
  };
};

export const fetchCourt = (id) => {
  return dispatch => {
    return APIUtil.fetchCourt(id).then(
      court => dispatch(receiveCourt(court))
    );
  };
};
export const fetchCourts = (id) => {
  return dispatch => {
    return APIUtil.fetchCourts(id).then(
      courts => dispatch(receiveCourts(courts))
    );
  };
};

export const createCourt = (court) => {
  return dispatch => {
    return APIUtil.createCourt(court).then(
      court => dispatch(receiveCourt(court))
    );
  };
};
