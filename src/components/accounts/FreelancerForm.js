import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { becomeFreelancer } from '../../actions/profiles';


const FreelancerForm = props => {
  const [bio, setBio] = useState('');
  const [technologies, setTechnologies] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const { becomeFreelancer, setFormIsVisible, setAlertIsVisible } = props;
    becomeFreelancer({ bio, technologies }, setFormIsVisible, setAlertIsVisible);
  };

  return (
    <MDBRow className="mb-4">
      <MDBCol md="6" className="offset-md-3">
        <MDBCard>
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <p className="h4 text-center py-2">Freelancer Form</p>
              <div className="grey-text">
                <MDBInput
                  label="Type your experience"
                  group
                  type="textarea"
                  rows="5"
                  validate
                  error="wrong"
                  success="right"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                />
                <MDBInput
                  label="Type technologies you know"
                  group
                  type="text"
                  validate
                  value={technologies}
                  onChange={e => setTechnologies(e.target.value)}
                />
              </div>
              <div className="text-center">
                <MDBBtn type="submit">Submit</MDBBtn>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};


FreelancerForm.propTypes = {
  becomeFreelancer: PropTypes.func.isRequired,
  setFormIsVisible: PropTypes.func.isRequired,
  setAlertIsVisible: PropTypes.func.isRequired
};


export default connect(null, { becomeFreelancer })(FreelancerForm);
