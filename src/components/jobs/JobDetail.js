import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import { useParams, Link } from 'react-router-dom';

import { loadJobDetail } from '../../actions/jobs';
import JobDeleteButton from "./JobDeleteButton";


const JobDetail = props => {
  const { id } = useParams();

  useEffect(() => props.loadJobDetail(id), [id]);

  const { auth } = props;
  const { user, summary, details, technologies, deadline, budget, timestamp } = props.jobDetail.job;

  let isOwner;
  if (Object.keys(auth.user).length) {
    if (auth.user.username === user) {
      isOwner = true
    }
  }

  return (
    <MDBCard className="my-5">
      <MDBCardBody className="position-relative">
        {
          isOwner &&
            <div style={{ position: 'absolute', top: '8px', right: '5px' }}>
              <MDBBtn color="warning" size="sm">Pay</MDBBtn>
              <Link to={{ pathname: '/job-form', job: props.jobDetail.job }}><MDBBtn size="sm">Edit</MDBBtn></Link>
              <JobDeleteButton />
            </div>
        }
        <MDBCardTitle className="text-center">{summary}</MDBCardTitle>
        <MDBCardBody>
          <div>Details: {details}</div>
          <br />
          <div>Technologies: {technologies}</div>
          <br />
          <div>Deadline: {deadline}</div>
          <br />
          <div>Budget: ${budget}</div>
          <br />
          <div className="text-muted">Posted by {user} on {timestamp && new Date(timestamp.toLocaleString()).toDateString()}</div>
        </MDBCardBody>
      </MDBCardBody>
    </MDBCard>
  )
};


JobDetail.propTypes = {
  loadJobDetail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  jobDetail: PropTypes.object.isRequired
};


const mapStateToProps = state => ({ auth: state.auth, jobDetail: state.jobDetail });


export default connect(mapStateToProps, { loadJobDetail })(JobDetail)
