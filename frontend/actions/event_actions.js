import * as APIUtil from '../util/event_api_util';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

export const receiveEvent = event => {
  return {
    type: RECEIVE_EVENT,
    event
  };
};

export const receiveEvents = events => {
  return {
    type: RECEIVE_EVENTS,
    events
  };
};

export const fetchEvent = (id) => {
  return dispatch => {
    return APIUtil.fetchEvent(id).then(
      event => dispatch(receiveEvent(event))
    );
  };
};
export const fetchEvents = (id) => {
  return dispatch => {
    return APIUtil.fetchEvents(id).then(
      events => dispatch(receiveEvents(events))
    );
  };
};
export const createEvent = (event) => {
  return dispatch => {
    return APIUtil.createEvent(event).then(
      event => dispatch(receiveEvent(event))
    );
  };
};
