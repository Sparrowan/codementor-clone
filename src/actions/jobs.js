import axios from 'axios';

import {
  JOB_LIST_LOADING,
  JOB_LIST_LOADED,
  JOB_LIST_ERROR,
  JOB_ADDED,
  JOB_DETAIL_LOADING,
  JOB_DETAIL_LOADED,
  JOB_DETAIL_ERROR
} from './types';
import { addToken } from '../utils';
import { jobListCreateUrl, jobDetailEditDeleteUrl } from '../endpoints';


export const loadJobList = () => dispatch => {
  dispatch({ type: JOB_LIST_LOADING });
  axios.get(jobListCreateUrl)
    .then(response => dispatch({ type: JOB_LIST_LOADED, payload: response.data }))
    .catch(error => {
        dispatch({ type: JOB_LIST_ERROR });
        console.log(error)
      });
};


export const loadJobDetail = id => dispatch => {
  dispatch({ type: JOB_DETAIL_LOADING });
  axios.get(jobDetailEditDeleteUrl(id))
    .then(response => dispatch({ type: JOB_DETAIL_LOADED, payload: response.data }))
    .catch(error => {
        dispatch({ type: JOB_DETAIL_ERROR });
        console.log(error)
      });
};


export const addJob = (data, history) => dispatch => {
  axios.post(jobListCreateUrl, data, addToken())
    .then(response => {
      dispatch({ type: JOB_ADDED, payload: response.data });
      // redirect to home page after successful job submission
      history.push('/');
    }).catch(error => console.log(error.response.data))
};


export const editJob = (id, data, history) => dispatch => {
  axios.put(jobDetailEditDeleteUrl(id), data, addToken())
    .then(() => history.push(`/jobs/${id}`))
    .catch(error => console.log(error.response.data));
};


export const deleteJob = (id, history) => {
  axios.delete(jobDetailEditDeleteUrl(id), addToken())
    .then(() => history.push('/'))
    .catch(error => console.log(error));
};
