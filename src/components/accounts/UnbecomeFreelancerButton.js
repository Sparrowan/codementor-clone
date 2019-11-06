import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { unbecomeFreelancer } from '../../actions/profiles';


const UnbecomeFreelancerButton = props => {
  const [isOpen, toggle] = useState(false);

  return (
    <>
      <MDBBtn color="default" className="mt-2 btn-block" onClick={() => toggle(!isOpen)}>Stop Being Freelancer</MDBBtn>
      <MDBModal isOpen={isOpen} toggle={() => toggle(!isOpen)}>
        <MDBModalHeader toggle={() => toggle(!isOpen)}>Are you sure you want to stop being a freelancer?</MDBModalHeader>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => toggle(!isOpen)}>Cancel</MDBBtn>
          <MDBBtn color="primary" onClick={() => props.unbecomeFreelancer()}>Stop Being Freelancer</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  )
};


UnbecomeFreelancerButton.propTypes = {
  unbecomeFreelancer: PropTypes.func.isRequired
};


export default connect(null, { unbecomeFreelancer })(UnbecomeFreelancerButton);
