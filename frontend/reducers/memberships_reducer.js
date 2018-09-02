import { merge } from 'lodash';
import { RECEIVE_MEMBERSHIP, RECEIVE_MEMBERSHIPS } from '../actions/membership_actions';

const membershipsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MEMBERSHIPS:
      return merge({}, action.memberships);
    case RECEIVE_MEMBERSHIP:
      const newMembership = { [action.membership.id]: action.membership };
      return merge({}, state, newMembership);
    default:
      return state;
  }
};

export default membershipsReducer;
