import * as APIUtil from '../util/club_api_util';
export const RECEIVE_CLUB = 'RECEIVE_CLUB';
export const RECEIVE_CLUBS = 'RECEIVE_CLUBS';

export const receiveClub = club => {
  return {
    type: RECEIVE_CLUB,
    club
  };
};

export const receiveClubs = clubs => {
  return {
    type: RECEIVE_CLUBS,
    clubs
  };
};

export const fetchClub = (id) => {
  return dispatch => {
    return APIUtil.fetchClub(id).then(
      club => dispatch(receiveClub(club))
    );
  };
};
export const fetchClubs = () => {
  return dispatch => {
    return APIUtil.fetchClubs().then(
      clubs => dispatch(receiveClubs(clubs))
    );
  };
};
export const createClub = (club) => {
  return dispatch => {
    return APIUtil.createClub(club).then(
      club => dispatch(receiveClub(club))
    );
  };
};
