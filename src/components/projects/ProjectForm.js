import React, { useReducer } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import { register } from '../../actions/auth';

const Register = props => {
  const initialState = {
    username: '',
    email: '',
    password: '',
    password2: ''
  };

  const [state, setState] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setState({[name]: value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.register(state);
    setState(initialState);
  };

  // redirect to home page after logging in
  // which is done automatically on registering
  if (props.isAuthenticated) {
    return <Redirect to="/" />
  }

  const { username, email, password, password2 } = state;

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="offset-md-3">
          <MDBCard className="mt-5">
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your username"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <MDBInput
                    label="Confirm your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Register
                  </MDBBtn>
                </div>
                <p>Have an account? <Link to="/login">Log in</Link></p>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};


Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { register })(Register);
