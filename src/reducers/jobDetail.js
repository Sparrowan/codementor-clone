import { JOB_DETAIL_LOADING, JOB_DETAIL_LOADED, JOB_DETAIL_ERROR } from '../actions/types';


const initialState = { isLoading: false, job: {} };


export default function (state = initialState, action) {
  switch (action.type) {
    case JOB_DETAIL_LOADING:
      return { ...state, isLoading: true };
    case JOB_DETAIL_LOADED:
      return { isLoading: false, job: { ...action.payload } };
    case JOB_DETAIL_ERROR:
      return { ...state, isLoading: false };
    default:
      return state
  }
}
