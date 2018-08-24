import { merge } from 'lodash';
import { RECEIVE_COURT, RECEIVE_COURTS } from '../actions/court_actions';

const courtsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COURTS:
      return merge({}, action.courts);
    case RECEIVE_COURT:
      const newCourt = { [action.court.id]: action.court };
      return merge({}, state, newCourt);
    default:
      return state;
  }
};

export default courtsReducer;
