import usersReducer from './users_reducer';
import clubsReducer from './clubs_reducer';
import courtsReducer from './courts_reducer';
import bookingsReducer from './bookings_reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  users: usersReducer,
  clubs: clubsReducer,
  bookings: bookingsReducer,
  courts: courtsReducer,
});
