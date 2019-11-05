import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  USER_LOADING,
  USER_LOADED,
  USER_ERROR
} from '../actions/types';


const initialState = {
  token: null,
  // if isLoading is false by default on refresh protected routes redirect authenticated uses to login page
  isLoading: true,
  isAuthenticated: false,
  user: {}
};


export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
    case USER_LOADING:
      return { ...state, isLoading: true };
    case AUTH_SUCCESS:
      return { ...state, token: action.payload, isLoading: false, isAuthenticated: true };
    case USER_LOADED:
      return { ...state, isLoading: false, user: action.payload };
    case AUTH_FAIL:
    case USER_ERROR:
      return { ...state, isLoading: false, isAuthenticated: false };
    case AUTH_LOGOUT:
      return initialState;
    default:
      return state
  }
}
