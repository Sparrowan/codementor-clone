import { PROJECT_DETAIL_LOADING, PROJECT_DETAIL_LOADED, PROJECT_DETAIL_ERROR } from '../actions/types';


const initialState = { isLoading: false, project: {} };


export default function (state = initialState, action) {
  switch (action.type) {
    case PROJECT_DETAIL_LOADING:
      return { ...state, isLoading: true };
    case PROJECT_DETAIL_LOADED:
      return { isLoading: false, project: { ...action.payload } };
    case PROJECT_DETAIL_ERROR:
      return { ...state, isLoading: false };
    default:
      return state
  }
}
