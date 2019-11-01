import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from '../actions/types';


const initialState = {
  token: null,
  isLoading: false
};


export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
      return { ...state, isLoading: true };
    case AUTH_SUCCESS:
      return { token: action.payload, isLoading: false };
    case AUTH_FAIL:
      return { ...state, isLoading: false };
    case AUTH_LOGOUT:
      return { ...state, token: null };
    default:
      return state
  }
}
