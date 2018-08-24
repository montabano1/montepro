import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_CLUB } from '../actions/club_actions';
import { SEND_INFO } from '../actions/court_actions';
import { merge } from 'lodash';

const defaultState = {
  id: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case SEND_INFO:
      return merge({}, state, { info: action.info });
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { id: action.user.id });
    case RECEIVE_CLUB:
      return merge({}, state, { club_id: action.club.id, court_amt: action.club.court_amt });
    case LOGOUT_CURRENT_USER:
      return defaultState;
    default:
      return state;
  }
}
