import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { deleteJob } from '../../actions/jobs';


const JobDeleteButton = props => {
  const [isOpen, toggle] = useState(false);

  const history = useHistory();

  return (
    <>
      <MDBBtn color="danger" size="sm" onClick={() => toggle(!isOpen)}>Delete</MDBBtn>
      <MDBModal isOpen={isOpen} toggle={() => toggle(!isOpen)}>
        <MDBModalHeader toggle={() => toggle(!isOpen)}>Are you sure you want to delete this job request?</MDBModalHeader>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => toggle(!isOpen)}>Cancel</MDBBtn>
          <MDBBtn color="primary" onClick={() => deleteJob(props.id, history)}>Delete</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  )
};


JobDeleteButton.propTypes = {
  id: PropTypes.number.isRequired
};


export default JobDeleteButton;
