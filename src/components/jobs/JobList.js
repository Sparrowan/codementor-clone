import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadJobList } from '../../actions/jobs';
import Job from './Job';


const JobList = props => {
  useEffect(() => props.loadJobList(), []);

  const { isLoading, jobs } = props.jobList;

  return (
    <>
      <div>
        {jobs.length > 0 && jobs.map(
          job => <Job key={job.id} job={job} />
        )}
      </div>
      {
        isLoading &&
          <div className="my-5 text-center spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
      }
   </>
  )
};


JobList.propTypes = {
  jobList: PropTypes.object.isRequired,
  loadJobList: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  jobList: state.jobList
});


export default connect(mapStateToProps, { loadJobList })(JobList)
