import { combineReducers } from 'redux';

import auth from './auth';
import projectList from './projectList';
import projectDetail from './projectDetail';


export default combineReducers({
  auth,
  projectList,
  projectDetail
})
