import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadProjectList } from '../../actions/projects';
import Project from './Project';


const ProjectList = props => {
  useEffect(() => props.loadProjectList(), []);

  const { isLoading, projects } = props.projectList;

  return (
    <>
      <div>
        {projects.length > 0 && projects.map(
          project => <Project key={project.id} project={project} />
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


ProjectList.propTypes = {
  projectList: PropTypes.object.isRequired,
  loadProjectList: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  projectList: state.projectList
});


export default connect(mapStateToProps, { loadProjectList })(ProjectList)
