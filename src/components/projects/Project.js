import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import PropTypes from 'prop-types';


const Project = props => {
  const { id, title, body } = props.project;

  return (
    <MDBCard className="my-5">
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText>{body}</MDBCardText>
        <MDBBtn href={`/projects/${id}`}>View Details</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  )
};


Project.propTypes = {
  project: PropTypes.object.isRequired
};


export default Project;
