import React, { Component } from 'react';

import Form from 'react-bootstrap/Form'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

export default class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      someState: null
    };
  }

  render() {
    return(
      <Navbar collapseOnSelect className='px-3' expand='lg' sticky='top' bg='white'>
        <Navbar.Brand href='/'>SPOT</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
            <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='register'>Sign Up</Nav.Link>
            <Nav.Link href='login'>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}
