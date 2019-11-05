import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadFreelancerList } from '../../actions/profiles';
import Freelancer from './Freelancer';


const FreelancerList = props => {
  useEffect(() => props.loadFreelancerList(), []);

  const { isLoading, freelancers } = props.freelancerList;

  return (
    <>
      <div>
        {freelancers.length > 0 && freelancers.map(
          freelancer => <Freelancer key={freelancer.id} freelancer={freelancer} />
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


FreelancerList.propTypes = {
  freelancerList: PropTypes.object.isRequired,
  loadFreelancerList: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  freelancerList: state.freelancerList
});


export default connect(mapStateToProps, { loadFreelancerList })(FreelancerList)
