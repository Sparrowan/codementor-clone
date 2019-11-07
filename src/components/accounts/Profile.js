import React, {useEffect, useState} from 'react';
import { MDBAlert, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdbreact';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadProfile } from '../../actions/profiles';
import ProfileDeleteButton from './ProfileDeleteButton';
import UnbecomeFreelancerButton from './UnbecomeFreelancerButton';
import FreelancerForm from './FreelancerForm';


const Profile = props => {
  const { id } = useParams();

  useEffect(() => props.loadProfile(id), [id]);

  const [formIsVisible, setFormIsVisible] = useState(false);
  const [alertIsVisible, setAlertIsVisible] = useState(false);

  const { auth } = props;
  const { user, freelancer, photo, social_accounts, timezone, languages } = props.profile.profile;

  let isOwner;

  if (Object.keys(auth.user).length && user) {
    if (auth.user.id === user.id) {
      isOwner = true
    }
  }

  let isFreelancer;
  // on unbecomeFreelancer server returns freelancer object with id=null
  // then on refresh object becomes null
  if (freelancer && freelancer.id) {
    isFreelancer = true
  }

  return (
    <>
      <MDBCard className="my-4 position-relative">
        {
          isOwner &&
            <div style={{ position: 'absolute', top: '8px', right: '5px' }}>
              <Link to="/profile-edit"><MDBBtn size="sm">Edit</MDBBtn></Link>
              <ProfileDeleteButton />
            </div>
        }
        <MDBCardTitle className="mt-3 text-center">
          {user && user.first_name} {user && user.last_name} {isOwner && isFreelancer && '(You are a freelancer)'}
        </MDBCardTitle>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md={2}>
              <img src={photo} className="img-fluid rounded" />
              {!isOwner && isFreelancer && <MDBBtn>Hire Now</MDBBtn>}
              {
                isOwner && !isFreelancer &&
                  <MDBBtn
                    color="success"
                    className="mt-2 btn-block"
                    onClick={() => setFormIsVisible(!formIsVisible)}
                  >
                    {formIsVisible ? <span>Hide<br />Form</span> : 'Become Freelancer'}
                  </MDBBtn>
              }
              {isOwner && isFreelancer && <UnbecomeFreelancerButton />}
            </MDBCol>
            <MDBCol md={10}>
              <div>Social Accounts: {social_accounts}</div>
              <br />
              <div>Timezone: {timezone}</div>
              <br />
              <div>Languages: {languages}</div>
              <br />
              {
                isFreelancer &&
                  <>
                    <div>Experience: {freelancer.bio}</div>
                    <br />
                    <div>Technologies: {freelancer.technologies}</div>
                    <br />
                  </>
              }

            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      {
        formIsVisible &&
          <FreelancerForm
            setFormIsVisible={setFormIsVisible}
            setAlertIsVisible={setAlertIsVisible}
          />
      }
      {
        alertIsVisible &&
          <MDBAlert color="success" dismiss>
            <strong>Success!</strong> You've become a freelancer.
          </MDBAlert>
      }
    </>
  )
};


const mapStateToProps = state => ({ auth: state.auth, profile: state.profile });


export default connect(mapStateToProps, { loadProfile })(Profile);
