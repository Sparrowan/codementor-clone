import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';

import { loadProjectDetail } from '../../actions/projects';



const ProjectDetail = props => {
  useEffect(() => props.loadProjectDetail(props.match.params.id), [props.match.params.id]);

  const { isAuthenticated, user } = props.auth;
  const { isLoading, project } = props.projectDetail;

  return (
    <MDBCard className="my-5">
      <MDBCardBody>
        <MDBCardTitle>{project.title}</MDBCardTitle>
        <MDBCardText>{project.body}</MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
};


ProjectDetail.propTypes = {
  loadProjectDetail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  ProjectDetail: PropTypes.object.isRequired
};


const mapStateToProps = state => ({ auth: state.auth, projectDetail: state.projectDetail });


export default connect(mapStateToProps, { loadProjectDetail })(ProjectDetail)
