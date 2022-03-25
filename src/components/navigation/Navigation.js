import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { isAuthenticated, logout, getUser } from 'src/utilities/authentication/auth.js';
import { withRouter } from 'src/utilities/routing/withRouter.js';

class Navigation extends Component {

  redirect(path) {
    this.props.navigate(path);
  }

  renderAuthOptions() {
    if (isAuthenticated()) {
      return(
        <Nav className='ms-auto'>
          <NavDropdown title={getUser().nickname} id='collapsible-nav-dropdown' align='end'>
            <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    } else {
      return(
        <Nav className='ms-auto'>
          <Nav.Link onClick={() => this.redirect('/register')}>Sign Up</Nav.Link>
          <Nav.Link onClick={() => this.redirect('/login')}>Login</Nav.Link>
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

export default withRouter(Navigation);
