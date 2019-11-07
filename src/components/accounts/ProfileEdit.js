import React, { useReducer, useEffect } from 'react';
import {  MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import { loadProfile, editProfile } from '../../actions/profiles';


const ProfileEdit = props => {
  const initialState = {
    id: '',
    freelancer: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    photoFile: '',
    photoUrl: '',
    social_accounts: '',
    timezone: '',
    languages: '',
    bio: '',
    technologies: ''
  };

  const [state, setState] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const history = useHistory();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'photo') {
      const photoFile = e.target.files[0];
      const photoUrl = URL.createObjectURL(photoFile);
      setState({ photoFile, photoUrl })
    } else {
      setState({ [name]: value });
    }

  };

  const handleSubmit = e => {
    e.preventDefault();
    props.editProfile(state, history);
    setState(initialState);
  };

  const prepopulateForm = profile => {
    // extract filename from url
    const fileName = profile.photo.split('/').pop();
    // fetch image file
    fetch(profile.photo)
      .then(response => response.blob())
      .then(file => {
        const photoFile = new File([file], fileName);
        // prepopulate fields with existing user profile data
        setState({
          id: profile.id,
          freelancer: profile.freelancer,
          username: profile.user.username,
          email: profile.user.email,
          first_name: profile.user.first_name,
          last_name: profile.user.last_name,
          photoFile: photoFile,
          photoUrl: profile.photo,
          social_accounts: profile.social_accounts,
          timezone: profile.timezone,
          languages: profile.languages,
          bio: profile.freelancer.bio,
          technologies: profile.freelancer.technologies
        })
      });
  };

  useEffect(() => {
    if (props.auth.user && Object.keys(props.auth.user).length) {
      props.loadProfile(props.auth.user.id, prepopulateForm)
    }
  }, [props.auth.user]);

  const { id, username, email, first_name, last_name, photoUrl, social_accounts, timezone, languages, bio, technologies } = state;

  return (
    <MDBRow>
      <MDBCol md="6" className="offset-md-3">
        <MDBCard className="my-4">
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <p className="h4 text-center py-4">Edit Your Profile</p>
              <div className="text-center">
                <img src={photoUrl} className="rounded mb-4" style={{ maxWidth: '13rem', maxHeight: '13rem' }} />
              </div>

              <div className="grey-text">
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      name="photo"
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                      Change your profile photo
                    </label>
                  </div>
                </div>
                <MDBInput
                  label="Your username"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
                <MDBInput
                  label="Your email"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <MDBInput
                  label="Your first name"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                />
                <MDBInput
                  label="Your last name"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                />
                <MDBInput
                  label="Your social accounts"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="social_accounts"
                  value={social_accounts}
                  onChange={handleChange}
                />
                <MDBInput
                  label="Your timezone"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="timezone"
                  value={timezone}
                  onChange={handleChange}
                />
                <MDBInput
                  label="Languages you speak"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="languages"
                  value={languages}
                  onChange={handleChange}
                />
                <MDBInput
                  label="Your experience"
                  group
                  type="textarea"
                  rows="5"
                  validate
                  error="wrong"
                  success="right"
                  name="bio"
                  value={bio}
                  onChange={handleChange}
                />
                <MDBInput
                  label="Technologies you know"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="technologies"
                  value={technologies}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center py-4 mt-3">
                <MDBBtn color="cyan" type="submit">Save</MDBBtn>
                <Link to={`profile/${id}`}><MDBBtn color="cyan">Cancel</MDBBtn></Link>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};


ProfileEdit.propTypes = {
  loadProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({ auth: state.auth });


export default connect(mapStateToProps, { loadProfile, editProfile })(ProfileEdit);
