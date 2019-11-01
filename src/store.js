import { createStore, applyMiddleware } from 'redux';
// A thunk is a function that wraps an expression to delay its evaluation
// https://github.com/reduxjs/redux-thunk#motivation
import thunk from 'redux-thunk';
// make store available to Redux DevTools in the browser
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';


const initialState = {};

// lets you write async logic that interacts with the store
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));


export default store;
