import React, { useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdbreact';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadProfile } from '../../actions/profiles';
import ProfileDeleteButton from './ProfileDeleteButton';


const Profile = props => {
  const { id } = useParams();

  useEffect(() => props.loadProfile(props.match.params.id), [props.match.params.id]);

  const { auth } = props;
  const { user, freelancer, photo, social_accounts, timezone, languages } = props.profile.profile;

  let isOwner;

  if (Object.keys(auth.user).length && user) {
    if (auth.user.id === user.id) {
      isOwner = true
    }
  }

  let isFreelancer;
  if (freelancer && Object.keys(freelancer).length) {
    isFreelancer = true
  }

  return (
    <MDBCard className="my-5">
      <MDBCardBody className="position-relative">
        {
          isOwner &&
            <div style={{ position: 'absolute', top: '8px', right: '5px' }}>
              <MDBBtn size="sm">Edit</MDBBtn>
              {/*<ProfileDeleteButton id={id} />*/}
            </div>
        }
        <MDBCardTitle className="text-center">{user && user.first_name} {user && user.last_name}</MDBCardTitle>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md={2}>
              <img src={photo} className="img-fluid rounded" />
              {!isOwner && isFreelancer && <MDBBtn>Hire Now</MDBBtn>}
              {isOwner && <MDBBtn color="success" style={{ marginLeft: 0, marginRight: 0 }}>Become Freelancer</MDBBtn>}
            </MDBCol>
            <MDBCol md={10}>
              <div>Social Accounts: {social_accounts}</div>
              <br />
              <div>Timezone: {timezone}</div>
              <br />
              <div>Languages: {languages}</div>
              <br />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCardBody>
    </MDBCard>
  )
};


const mapStateToProps = state => ({ auth: state.auth, profile: state.profile });


export default connect(mapStateToProps, { loadProfile })(Profile);

// todo align button