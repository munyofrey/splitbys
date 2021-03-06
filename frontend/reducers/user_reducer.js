import { userConstants } from '../actions/user_actions';
import { merge } from 'lodash';

const preloadedState = [];

const userReducer = (oldState = preloadedState, action) => {
  switch (action.type) {
    case userConstants.RECEIVE_USERS:
      return action.users
      break;
    case "CLEAR_STATE":
      return preloadedState;
    default: return oldState

  }
}

export default userReducer;
