import React, { useReducer, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, useLocation } from 'react-router-dom';

import { addJob, editJob } from '../../actions/jobs';


const JobForm = props => {
  const initialState = {
    summary: '',
    details: '',
    technologies: '',
    deadline: '',
    budget: ''
  };

  const [state, setState] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const job = useLocation().job;

  useEffect(() => {
    if (job) {
      setState({
        summary: job.summary,
        details: job.details,
        technologies: job.technologies,
        deadline: job.deadline,
        budget: job.budget
      })
    }
  }, [job]);

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (job) {
      props.editJob(job.id, state, props.history);
    } else {
      props.addJob(state, props.history);
    }
    setState(initialState);
  };

  const { summary, details, technologies, deadline, budget } = state;

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="offset-md-3">
          <MDBCard className="mt-5">
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <p className="h4 text-center mb-4">
                  {job ? 'Edit job request' : 'Create a job request'}
                </p>
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
  editJob: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { addJob, editJob })(JobForm);
