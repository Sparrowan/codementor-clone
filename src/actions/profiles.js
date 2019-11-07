import axios from 'axios';

import {
  FREELANCER_LIST_LOADING,
  FREELANCER_LIST_LOADED,
  FREELANCER_LIST_ERROR,
  PROFILE_LOADING,
  PROFILE_LOADED,
  PROFILE_ERROR,
  AUTH_LOGOUT
} from './types';
import {
  freelancerListUrl,
  profileDetailEditDeleteUrl,
  becomeFreelancerUrl,
  unbecomeFreelancerUrl,
} from '../endpoints';
import { addToken } from '../utils';


export const loadFreelancerList = () => dispatch => {
  dispatch({ type: FREELANCER_LIST_LOADING });
  axios.get(freelancerListUrl)
    .then(response => dispatch({ type: FREELANCER_LIST_LOADED, payload: response.data }))
    .catch(error => {
        dispatch({ type: FREELANCER_LIST_ERROR });
        console.log(error)
      });
};


export const loadProfile = (id, prepopulateForm) => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios.get(profileDetailEditDeleteUrl(id))
    .then(response => {
      dispatch({ type: PROFILE_LOADED, payload: response.data });
      if (prepopulateForm) prepopulateForm(response.data)
    })
    .catch(error => {
        dispatch({ type: PROFILE_ERROR });
        console.log(error)
      });
};


const headers = {
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data'
  }
};


export const editProfile = (profile, history) => dispatch => {
  const data = new FormData();
  const user = {
    'user': {
      username: profile.username,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name
    }
  };
  data.append('user', JSON.stringify(user));

  let freelancer;
  if (profile.freelancer) {
    freelancer = {
      freelancer: {
        bio: profile.bio,
        technologies: profile.technologies
      }
    };
    data.append('freelancer', JSON.stringify(freelancer));
  }

  data.append('photo', profile.photoFile);
  data.append('social_accounts', profile.social_accounts);
  data.append('timezone', profile.timezone);
  data.append('languages', profile.languages);

  axios.put(profileDetailEditDeleteUrl(profile.id), data, headers)
    .then(response => dispatch({ type: PROFILE_LOADED, payload: response.data }))
    .catch(error => {
        dispatch({ type: PROFILE_ERROR });
        console.log(error.response.data)
      });
};


export const deleteProfile = (id, history) => dispatch => {
  axios.delete(profileDetailEditDeleteUrl(id), addToken())
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      dispatch({ type: AUTH_LOGOUT});
      history.push('/')
    })
    .catch(error => console.log(error));
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


// todo implement logout function inside deleteProfile function
