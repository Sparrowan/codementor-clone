import axios from 'axios';

import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  USER_LOADING,
  USER_LOADED,
  USER_ERROR
} from '../actions/types';
import { registerUrl, loginUrl, userUrl } from '../endpoints';
import { addToken } from '../utils';


export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => dispatch(logout()), expirationTime * 1000);
};


const loadUser = dispatch => {
    dispatch({ type: USER_LOADING });
    axios.get(userUrl, addToken())
      .then(response => dispatch({ type: USER_LOADED, payload: response.data }))
      .catch(error => {
        dispatch({ type: USER_ERROR });
        console.log(error)
      })
};


export const loadAuth = () => dispatch => {
  const token = localStorage.getItem('token');
  if (token === undefined) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch({ type: AUTH_SUCCESS, payload: token });
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
      loadUser(dispatch);
    }
  }
};


// register user
export const register = data => dispatch => {
  dispatch({ type: AUTH_START });
  axios.post(registerUrl, data)
    .then(response => {
      console.log(response.data);
      const token = response.data.key;
      const expirationDate = new Date(new Date().getTime() + 360000 * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch({ type: AUTH_SUCCESS, payload: token });
      dispatch(checkAuthTimeout(360000));
      loadUser(dispatch);
    })
    .catch(error => {
      dispatch({ type: AUTH_FAIL });
      console.log(error)
    })
};


// login user
export const login = data => dispatch => {
  axios.post(loginUrl, data)
    .then(response => {
      const token = response.data.key;
      const expirationDate = new Date(new Date().getTime() + 360000 * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch({ type: AUTH_SUCCESS, payload: token });
      dispatch(checkAuthTimeout(360000));
      loadUser(dispatch);
    })
    .catch(error => {
      dispatch({ type: AUTH_FAIL });
      console.log(error)
    })
};


// logout user
export const logout = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  dispatch({ type: AUTH_LOGOUT});
};
