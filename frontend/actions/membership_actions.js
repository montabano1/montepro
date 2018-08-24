import * as APIUtil from '../util/membership_api_util';
export const RECEIVE_MEMBERSHIP = 'RECEIVE_MEMBERSHIP';
export const RECEIVE_MEMBERSHIPS = 'RECEIVE_MEMBERSHIPS';

export const receiveMembership = membership => {
  return {
    type: RECEIVE_MEMBERSHIP,
    membership
  };
};

export const receiveMemberships = memberships => {
  return {
    type: RECEIVE_MEMBERSHIPS,
    memberships
  };
};

export const fetchMembership = (id) => {
  return dispatch => {
    return APIUtil.fetchMembership(id).then(
      membership => dispatch(receiveMembership(membership))
    );
  };
};
export const fetchMemberships = () => {
  return dispatch => {
    return APIUtil.fetchMemberships().then(
      memberships => dispatch(receiveMemberships(memberships))
    );
  };
};
export const createMembership = (membership) => {
  return dispatch => {
    return APIUtil.createMembership(membership).then(
      membership => dispatch(receiveMembership(membership))
    );
  };
};
