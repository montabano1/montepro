import * as UserApiUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};
const receiveUsers = user => {
  return {
    type: RECEIVE_USERS,
    user
  };
};

export const fetchUser = id => {
  return dispatch => {
    return UserApiUtil.fetchUser(id).then(user => {
      return dispatch(receiveUser(user));
    });
  };
};
export const fetchPros = id => {
  return dispatch => {
    return UserApiUtil.fetchPros(id).then(users => {
      return dispatch(receiveUsers(users));
    });
  };
};
export const updateUser = user => {
  return dispatch => {
    return UserApiUtil.updateUser(user).then(user => {
      return dispatch(receiveUser(user));
    });
  };
};
