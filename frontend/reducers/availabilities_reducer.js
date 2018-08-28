import { merge } from 'lodash';
import { RECEIVE_AVAILABILITY, RECEIVE_AVAILABILITIES } from '../actions/availability_actions';

const availabilitiesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_AVAILABILITIES:
      return merge({}, action.availabilities);
    case RECEIVE_AVAILABILITY:
      const newAvailability = { [action.availability.id]: action.availability };
      return merge({}, state, newAvailability);
    default:
      return state;
  }
};

export default availabilitiesReducer;
