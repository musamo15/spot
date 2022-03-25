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
      return (
        <Nav className='ms-auto'>
          <NavDropdown title={getUser().nickname} id='collapsible-nav-dropdown' align='end'>
            <NavDropdown.Item href='create-listing?category=generic&mode=create'>Create Listing</NavDropdown.Item>
            <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    } else {
      return (
        <Nav className='ms-auto'>
          <Nav.Link href='/register'>Sign Up</Nav.Link>
          <Nav.Link href='/login'>Login</Nav.Link>
        </Nav>
      );
    }
  }

  render() {
    return (
      <Navbar collapseOnSelect className='px-3' expand='lg' sticky='top' bg='white'>
        <Navbar.Brand href='/'>SPOT</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <NavDropdown title='Categories' id='collasible-nav-dropdown-category'>
            <NavDropdown.Item href='/category/Car'>Cars</NavDropdown.Item>
            <NavDropdown.Item href='/category/Test'>Test</NavDropdown.Item>
          </NavDropdown>
          {this.renderAuthOptions()}
        </Navbar.Collapse >
      </Navbar >
    );
  }

}

export default withRouter(Navigation);
