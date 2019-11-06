import axios from 'axios';

import {
  FREELANCER_LIST_LOADING,
  FREELANCER_LIST_LOADED,
  FREELANCER_LIST_ERROR,
  PROFILE_LOADING,
  PROFILE_LOADED,
  PROFILE_ERROR
} from './types';
import { profileUrl, freelancerListUrl, becomeFreelancerUrl, unbecomeFreelancerUrl } from '../endpoints';
import { addToken } from '../utils';


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


export const becomeFreelancer = (data, setFormIsVisible, setAlertIsVisible) => dispatch => {
  axios.post(becomeFreelancerUrl, data, addToken())
    .then(response => {
      dispatch({ type: PROFILE_LOADED, payload: response.data });
      setFormIsVisible(false);
      setAlertIsVisible(true)
    })
    .catch(error => {
        dispatch({ type: PROFILE_ERROR });
        console.log(error)
      });
};


export const unbecomeFreelancer = () => dispatch => {
  axios.get(unbecomeFreelancerUrl, addToken())
    .then(response => {
      dispatch({ type: PROFILE_LOADED, payload: response.data });
    })
    .catch(error => {
        dispatch({ type: PROFILE_ERROR });
        console.log(error)
      });
};
