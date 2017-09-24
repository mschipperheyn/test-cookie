import * as actionTypes from '../userActionTypes';

const initialState = {
  lastCheck: -1,
  user: null,
  authenticated: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        ...{
          lastCheck: Date.now(),
          user: action.payload,
          validationError: false,
          authenticated: true,
        },
      };
    }
    case actionTypes.LOGIN_FAIL: {
      return {
        ...state,
        ...{
          lastCheck: -1,
          validationError: true,
        },
      };
    }
    case actionTypes.LOGIN_ERROR: {
      return {
        ...state,
        ...{
          lastCheck: -1,
          validationError: false,
          error: action.payload,
        },
      };
    }
    case actionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        ...{
          lastCheck: -1,
          user: null,
          validationError: false,
          authenticated: false,
        },
      };
    }
    case actionTypes.LOGIN_SESSION: {
      return {
        ...state,
        ...{
          lastCheck: Date.now(),
          authenticated: true,
        },
      };
    }

    case actionTypes.SESSION_FAIL: {
      return {
        ...state,
        ...{
          lastCheck: Date.now(),
          authenticated: false,
        },
      };
    }

    default:
      return state;
  }
}
