import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { MDBContainer } from 'mdbreact';

import store from '../store';
import { loadAuth } from '../actions/auth';
import Navbar from './common/Navbar';
import PrivateRoute from './accounts/PrivateRoute';
import Login from './accounts/Login';
import Register from './accounts/Register';
import ProjectList from './projects/ProjectList';
import ProjectDetail from './projects/ProjectDetail';
// import ProjectForm from './projects/ProjectForm';


const App = () => {
  useEffect(() => store.dispatch(loadAuth()), []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <MDBContainer>
          <Switch>
            <Route exact path="/" component={ProjectList} />
            <Route exact path="/projects/:id" component={ProjectDetail} />
            {/*<PrivateRoute exact path="/project-form" component={ProjectForm} />*/}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </MDBContainer>
      </Router>
    </Provider>
  )
};


export default App;
