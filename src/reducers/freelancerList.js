import { FREELANCER_LIST_LOADING, FREELANCER_LIST_LOADED, FREELANCER_LIST_ERROR } from '../actions/types';


const initialState = { isLoading: false, freelancers: [] };


export default function (state = initialState, action) {
  switch (action.type) {
    case FREELANCER_LIST_LOADING:
      return { ...state, isLoading: true };
    case FREELANCER_LIST_LOADED:
      return { isLoading: false, freelancers: [...action.payload] };
    case FREELANCER_LIST_ERROR:
      return { ...state, isLoading: false };
    default:
      return state
  }
}
