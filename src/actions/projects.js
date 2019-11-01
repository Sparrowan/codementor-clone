import axios from 'axios';

import {
  PROJECT_LIST_LOADING,
  PROJECT_LIST_LOADED,
  PROJECT_LIST_ERROR,
  PROJECT_ADDED,
  PROJECT_DETAIL_LOADING,
  PROJECT_DETAIL_LOADED,
  PROJECT_DETAIL_ERROR
} from './types';
import { authAxios } from '../utils';
import { projectListCreateUrl, projectDetailUrl } from '../endpoints';


export const loadProjectList = () => dispatch => {
  dispatch({ type: PROJECT_LIST_LOADING });
  axios.get(projectListCreateUrl)
    .then(response => {dispatch({ type: PROJECT_LIST_LOADED, payload: response.data }); console.log(response.data)})
    .catch(error => {
        dispatch({ type: PROJECT_LIST_ERROR });
        console.log(error)
      });
};


export const loadProjectDetail = id => dispatch => {
  dispatch({ type: PROJECT_DETAIL_LOADING });
  axios.get(projectDetailUrl(id))
    .then(response => dispatch({ type: PROJECT_DETAIL_LOADED, payload: response.data }))
    .catch(error => {
        dispatch({ type: PROJECT_DETAIL_ERROR });
        console.log(error)
      });
};


export const addProject = (project, history) => dispatch => {
  authAxios.post(projectListCreateUrl, JSON.stringify(project))
    .then(response => {
      dispatch({ type: PROJECT_ADDED, payload: response.data });
      // redirect to home page after successful project submission
      history.push('/');
    }).catch(error => console.log(error))
};
