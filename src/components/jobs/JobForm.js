import React, { useReducer } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import { addJob } from '../../actions/jobs';


const JobForm = props => {
  const initialState = {
    summary: '',
    details: '',
    technologies: '',
    deadline: '',
    budget: ''
  };

  const [state, setSate] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setSate({[name]: value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.addJob(state, props.history);
    setSate(initialState);
  };

  const { summary, details, technologies, deadline, budget } = state;

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="offset-md-3">
          <MDBCard className="mt-5">
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <p className="h4 text-center mb-4">Create a job request</p>
                <MDBInput
                  label="One sentence summary of your request"
                  outline
                  name="summary"
                  value={summary}
                  onChange={handleChange}
                />
                <MDBInput
                  type="textarea"
                  label="Details of what you need help with"
                  rows="5"
                  outline
                  name="details"
                  value={details}
                  onChange={handleChange}
                />
                <MDBInput
                  label="Technologies you need help with"
                  outline
                  name="technologies"
                  value={technologies}
                  onChange={handleChange}
                />
                <MDBInput
                  label="Deadline"
                  outline
                  type="date"
                  name="deadline"
                  value={deadline}
                  onChange={handleChange}
                  className="mt-5"
                />
                <MDBInput
                  label="Budget $"
                  outline
                  type="number"
                  name="budget"
                  value={budget}
                  onChange={handleChange}
                />
                <div className="text-center mt-4">
                  <MDBBtn color="primary" outline type="submit">
                    Submit
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};


JobForm.propTypes = {
  addJob: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { addJob })(JobForm);
