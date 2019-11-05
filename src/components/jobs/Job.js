import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import PropTypes from 'prop-types';


const Job = props => {
  const { id, summary, timestamp } = props.job;

  return (
    <MDBCard className="my-5 text-center">
      <MDBCardBody className="position-relative">
        <MDBCardTitle>{summary}</MDBCardTitle>
        <span
          className="position-absolute text-muted"
          style={{ top: "5px", right: "8px" }}
        >
          {new Date(timestamp.toLocaleString()).toDateString()}
        </span>
        <MDBBtn href={`/jobs/${id}`}>View Details</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  )
};


Job.propTypes = {
  job: PropTypes.object.isRequired
};


export default Job;
