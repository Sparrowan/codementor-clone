import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdbreact';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Freelancer = props => {
  const { id, photo, user, freelancer } = props.freelancer;

  return (
    <MDBCol className="col-md-4 offset-md-4 text-center">
      <MDBCard className="my-5">
        <Link to={`/profile/${id}`}><MDBCardImage className="img-fluid" src={photo} waves /></Link>
        <MDBCardBody>
          <MDBCardTitle>{user.first_name} {user.last_name}</MDBCardTitle>
          <MDBCardText>
            {freelancer.technologies}
          </MDBCardText>
          <MDBBtn href="#">Hire Now</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
};


Freelancer.propTypes = {
  freelancer: PropTypes.object.isRequired
};


export default Freelancer;
