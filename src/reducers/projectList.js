import { PROJECT_LIST_LOADING, PROJECT_LIST_LOADED, PROJECT_LIST_ERROR, PROJECT_ADDED } from '../actions/types';


const initialState = { isLoading: false, projects: [] };


export default function (state = initialState, action) {
  switch (action.type) {
    case PROJECT_LIST_LOADING:
      return { ...state, isLoading: true };
    case PROJECT_LIST_LOADED:
      return { isLoading: false, projects: [...action.payload] };
    case PROJECT_LIST_ERROR:
      return { ...state, isLoading: false };
    case PROJECT_ADDED:
      return { ...state, projects: [action.payload, ...state.projects] };
    default:
      return state
  }
}
