import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      someState: null
    };
  }

  renderAuthOptions() {
    if (this.props.auth0.isAuthenticated) {
      console.log(this.props.auth0.user.sub);
      return(
        <Nav className='ms-auto'>
          <NavDropdown title={this.props.auth0.user.name} id='collapsible-nav-dropdown' align='end'>
            <NavDropdown.Item onClick={() => this.props.auth0.logout({ returnTo: window.location.origin })}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    } else {
      return(
        <Nav className='ms-auto'>
          <Nav.Link onClick={() => this.props.auth0.loginWithRedirect({ 'screen_hint': 'signup' })}>Sign Up</Nav.Link>
          <Nav.Link onClick={this.props.auth0.loginWithRedirect}>Login</Nav.Link>
        </Nav>
      );
    }
  }

  render() {
    return(
      <Navbar collapseOnSelect className='px-3' expand='lg' sticky='top' bg='white'>
        <Navbar.Brand href='/'>SPOT</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse id='responsive-navbar-nav'>
          {this.renderAuthOptions()}
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default withAuth0(Navigation);
