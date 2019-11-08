import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import { useParams, Link } from 'react-router-dom';

import { loadJobDetail, applyForJob } from '../../actions/jobs';
import JobDeleteButton from './JobDeleteButton';
import ApplicantList from './ApplicantList';


const JobDetail = props => {
  const { id } = useParams();

  useEffect(() => props.loadJobDetail(id), [id]);

  const { auth } = props;
  const { user, applicants, freelancer, summary, details, technologies, deadline, budget, timestamp } = props.jobDetail.job;

  let isOwner;
  let hasApplied;
  let jobHasLoaded;
  if (Object.keys(auth.user).length && Object.keys(props.jobDetail.job).length) {
    if (auth.user.username === user) {
      isOwner = true
    }
    // check if user has applied for the job
    hasApplied = !!applicants.filter(applicant => applicant.id === auth.user.id).length;
    jobHasLoaded = true
  }

  return (
    <MDBCard className="my-5">
      <MDBCardBody className="position-relative">
        <div style={{ position: 'absolute', top: '8px', right: '5px' }}>
        {
          isOwner ?
            <>
              <Link to={{ pathname: '/job-form', job: props.jobDetail.job }}><MDBBtn size="sm">Edit</MDBBtn></Link>
              <JobDeleteButton />
            </>
          :
            auth.isAuthenticated &&
              <>
                <MDBBtn size="sm" color={hasApplied ? 'deep-orange' : 'primary'} onClick={() => props.applyForJob(id)}>
                  {hasApplied ? 'Cancel Your Application' : 'Apply For The Job'}
                </MDBBtn>
              </>
        }
        </div>
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
          <br />
          {
            freelancer &&
              <div>
                <h5>Freelancer: </h5>
                <Link to={`/profile/${freelancer.id}`}>
                  {freelancer.first_name} {freelancer.last_name}
                </Link>
                <MDBBtn color="warning" size="sm">Pay</MDBBtn>
              </div>
          }
          <br />
          {isOwner && jobHasLoaded && <ApplicantList applicants={applicants} job_id={parseInt(id, 10)} />}
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


export default connect(mapStateToProps, { loadJobDetail, applyForJob })(JobDetail)
