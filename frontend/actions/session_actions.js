import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const SEND_ERRORS = "SEND_ERRORS"

export const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};
export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

export const receiveErrors = (errors) => {

  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};


export const login = user => {

  return dispatch => {
    return SessionApiUtil.login(user).then(user => {
      return dispatch(receiveCurrentUser(user));
    }, errors => {
      return dispatch(receiveErrors(errors.responseJSON));
    });
  };
};
export const signup = user => {
  return dispatch => {
    return SessionApiUtil.signup(user).then(user => {
      return dispatch(receiveCurrentUser(user));
    }, errors => {
      return dispatch(receiveErrors(errors.responseJSON));
    });
  };
};
export const sendErrors = errors => {
  return dispatch => {
      return dispatch(receiveErrors(errors));
  };
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(() => dispatch(logoutCurrentUser()));
};
