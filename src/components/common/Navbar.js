import React, { useState } from 'react';
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from 'mdbreact';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';


const Navbar = props => {
  const [isOpen, setOpen] = useState(false);

  return (
    <MDBNavbar color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <MDBNavLink title="Freelancer Marketplace" to="/"><strong className="white-text text-uppercase">FM</strong></MDBNavLink>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={() => setOpen(!isOpen)} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/project-form">Create project</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/project-form">Freelancers</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          {
            props.isAuthenticated ?
              <>
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


const mapStateToProps = state => ({ isAuthenticated: state.auth.token !== null });


export default connect(mapStateToProps, { logout })(Navbar);
