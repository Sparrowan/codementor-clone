import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ApplicantList = props => {
  return (
    <>
      <h5>Applicants:</h5>
      <div>
        {props.applicants.length > 0 && props.applicants.map(
          applicant => {
            return (
              <div key={applicant.id}>
                <Link to={{ pathname: `/profile/${applicant.id}`, job_id: props.job_id }}>
                  {applicant.first_name} {applicant.last_name}
                </Link>
              </div>
            )
          }
        )}
      </div>
   </>
  )
};


ApplicantList.propTypes = {
  applicants: PropTypes.array.isRequired,
  job_id: PropTypes.number.isRequired
};


export default ApplicantList;
