import { PROFILE_LOADING, PROFILE_LOADED, PROFILE_ERROR } from '../actions/types';


const initialState = { isLoading: false, profile: {} };


export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return { ...state, isLoading: true };
    case PROFILE_LOADED:
      return { isLoading: false, profile: { ...action.payload } };
    case PROFILE_ERROR:
      return { ...state, isLoading: false };
    default:
      return state
  }
}
