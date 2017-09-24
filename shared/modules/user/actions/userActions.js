import { status } from 'utils';
import * as actionTypes from '../userActionTypes';

export function checkLogin() {
  return async (dispatch) => {
    try {
      const res = await fetch('/admin/rest/status', {
        method: 'GET',
        credentials: 'include',
      });

      dispatch({
        type: res.status === 200 ? actionTypes.LOGIN_SESSION : actionTypes.SESSION_FAIL,
      });
    } catch (e) {
      dispatch({
        type: actionTypes.SESSION_FAIL,
      });
    }
  };
}

export function login(data) {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_START,
    });

    try {
      const res = await fetch('/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        // login failed
        dispatch({
          type: actionTypes.LOGIN_FAIL,
        });

        return {
          errors: [
            {
              field: 'username',
              message: 'Email ou senha errado',
            },
          ],
        };
      } else if (res.status === 200) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
        });

        // window.localStorage.setItem('token', null);
      }

      return { errors: [] };
    } catch (err) {
      dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: err,
      });

      throw err;
    }
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LOGOUT_START,
    });

    try {
      await fetch('/admin/logout', {
        method: 'POST',
      });

      dispatch({
        type: actionTypes.LOGOUT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.LOGOUT_ERROR,
        payload: err,
      });

      throw err;
    }
  };
}

export function loggedIn() {
  return !!(typeof window !== 'undefined' ? localStorage.token : undefined);
}
