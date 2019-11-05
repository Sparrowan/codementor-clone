import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if (auth.isLoading) {
        return (
          <div className="my-5 text-center spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )
      } else if (!auth.token) {
        return <Redirect to="/login" />
      } else {
        return <Component {...props} />
      }
    }}/>
  )
};


PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps)(PrivateRoute)
