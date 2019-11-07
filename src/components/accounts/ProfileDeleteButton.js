import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteProfile } from '../../actions/profiles';


const ProfileDeleteButton = props => {
  const [isOpen, toggle] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  return (
    <>
      <MDBBtn color="danger" size="sm" onClick={() => toggle(!isOpen)}>Delete</MDBBtn>
      <MDBModal isOpen={isOpen} toggle={() => toggle(!isOpen)}>
        <MDBModalHeader toggle={() => toggle(!isOpen)}>Are you sure you want to delete your profile?</MDBModalHeader>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => toggle(!isOpen)}>Cancel</MDBBtn>
          <MDBBtn color="primary" onClick={() => props.deleteProfile(id, history)}>Delete</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  )
};


ProfileDeleteButton.propTypes = {
  deleteProfile: PropTypes.func.isRequired
};


export default connect(null, { deleteProfile })(ProfileDeleteButton);
