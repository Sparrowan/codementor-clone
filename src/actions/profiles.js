import axios from 'axios';

import {
  FREELANCER_LIST_LOADING,
  FREELANCER_LIST_LOADED,
  FREELANCER_LIST_ERROR,
  PROFILE_LOADING,
  PROFILE_LOADED,
  PROFILE_ERROR
} from './types';

import { profileUrl, freelancerListUrl } from '../endpoints';


export const loadProfile = id => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios.get(profileUrl(id))
    .then(response => dispatch({ type: PROFILE_LOADED, payload: response.data }))
    .catch(error => {
        dispatch({ type: PROFILE_ERROR });
        console.log(error)
      });
};


export const loadFreelancerList = () => dispatch => {
  dispatch({ type: FREELANCER_LIST_LOADING });
  axios.get(freelancerListUrl)
    .then(response => dispatch({ type: FREELANCER_LIST_LOADED, payload: response.data }))
    .catch(error => {
        dispatch({ type: FREELANCER_LIST_ERROR });
        console.log(error)
      });
};
