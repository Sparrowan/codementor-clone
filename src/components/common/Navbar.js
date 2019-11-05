import React, { useState } from 'react';
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from 'mdbreact';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';


const Navbar = props => {
  const [isOpen, setOpen] = useState(false);

  const { isAuthenticated, user } = props.auth;

  return (
    <MDBNavbar color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <MDBNavLink title="Freelancer Marketplace" to="/"><strong className="white-text text-uppercase">FM</strong></MDBNavLink>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={() => setOpen(!isOpen)} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/job-form">Create request</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/freelancers">Freelancers</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          {
            isAuthenticated ?
              <>
                <MDBNavItem>
                  <MDBNavLink to={`/profile/${user.id}`}>{user.username}</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="#!" onClick={() => props.logout()}>Logout</MDBNavLink>
                </MDBNavItem>
              </>
            :
              <>
                <MDBNavItem>
                  <MDBNavLink to="/login">Login</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/register">Register</MDBNavLink>
                </MDBNavItem>
              </>
          }
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};


const mapStateToProps = state => ({ auth: state.auth });


export default connect(mapStateToProps, { logout })(Navbar);
