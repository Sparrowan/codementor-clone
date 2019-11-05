import { JOB_LIST_LOADING, JOB_LIST_LOADED, JOB_LIST_ERROR, JOB_ADDED } from '../actions/types';


const initialState = { isLoading: false, jobs: [] };


export default function (state = initialState, action) {
  switch (action.type) {
    case JOB_LIST_LOADING:
      return { ...state, isLoading: true };
    case JOB_LIST_LOADED:
      return { isLoading: false, jobs: [...action.payload] };
    case JOB_LIST_ERROR:
      return { ...state, isLoading: false };
    case JOB_ADDED:
      return { ...state, jobs: [action.payload, ...state.jobs] };
    default:
      return state
  }
}
