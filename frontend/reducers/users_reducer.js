import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER, RECEIVE_USERS } from '../actions/user_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_USERS:
      return merge({}, action.user);
    default:
      return state;
  }
};
