import { merge } from 'lodash';
import { RECEIVE_CLUB, RECEIVE_CLUBS } from '../actions/club_actions';

const clubsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CLUBS:
      return merge({}, action.clubs);
    case RECEIVE_CLUB:
      const newClub = { [action.club.id]: action.club };
      return merge({}, state, newClub);
    default:
      return state;
  }
};

export default clubsReducer;
