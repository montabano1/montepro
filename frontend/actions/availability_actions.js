import * as APIUtil from '../util/availability_api_util';
export const RECEIVE_AVAILABILITY = 'RECEIVE_AVAILABILITY';
export const RECEIVE_DELETED_AVAILABILITY = 'RECEIVE_DELETED_AVAILABILITY';
export const RECEIVE_AVAILABILITIES = 'RECEIVE_AVAILABILITIES';

export const receiveAvailability = availability => {
  return {
    type: RECEIVE_AVAILABILITY,
    availability
  };
};
export const receiveDeletion = availability => {
  return {
    type: RECEIVE_DELETED_AVAILABILITY,
    availability
  };
};

export const receiveAvailabilities = availabilities => {
  return {
    type: RECEIVE_AVAILABILITIES,
    availabilities
  };
};

export const fetchAvailability = (id) => {
  return dispatch => {
    return APIUtil.fetchAvailability(id).then(
      availability => dispatch(receiveAvailability(availability))
    );
  };
};
export const deleteAvailability = (id) => {
  return dispatch => {
    return APIUtil.deleteAvailability(id).then(
      availability => dispatch(receiveDeletion(availability))
    );
  };
};
export const fetchAvailabilities = (id) => {
  return dispatch => {
    return APIUtil.fetchAvailabilities(id).then(
      availabilities => dispatch(receiveAvailabilities(availabilities))
    );
  };
};
export const createAvailability = (availability) => {
  return dispatch => {
    return APIUtil.createAvailability(availability).then(
      availability => dispatch(receiveAvailability(availability))
    );
  };
};
