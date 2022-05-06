import React, { Component } from 'react';
import axios from 'axios';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchBar from 'src/components/SearchBar';
import { isAuthenticated, logout, getUser } from 'src/utilities/authentication/auth.js';
import { withRouter } from 'src/utilities/routing/withRouter.js';


class Navigation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: [],
    }
  }

  redirect(path) {
    this.props.navigate(path);
  }

  componentDidMount() {
    this.getCategories()

  }

  async getCategories() {
    try {
      const resp = await axios.get('http://localhost:8000/categories');
      if (resp.status === 200) {
        this.setState({
          categories: resp.data
        });
      }
    } catch (error) {
      // Do nothing
    }

  }

  renderAuthOptions() {
    if (isAuthenticated()) {
      return (
        <NavDropdown title={getUser().nickname} id='auth-dropdown' align='end'>
          <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
          <NavDropdown.Item href='/create-listing?mode=create'>Create Listing</NavDropdown.Item>
          <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
        </NavDropdown>
      );
    } else {
      return (
        <>
          <Nav.Link href='/register'>Register</Nav.Link>
          <Nav.Link href='/login'>Login</Nav.Link>
        </>
      );
    }
  }

  render() {
    return (
      <Navbar collapseOnSelect className='px-3' expand='lg' sticky='top' bg='white'>
        <Navbar.Brand href='/'>SPOT</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <SearchBar />
          <Nav className='ms-auto'>
            <NavDropdown title='Categories' id='category-dropdown' align='end'>
              {this.state.categories.map((category) => (
                <NavDropdown.Item key={category} href={`/categories/${category}`}>{category.toString().charAt(0).toUpperCase() + category.toString().slice(1)}</NavDropdown.Item>
                )
              )}
            </NavDropdown>
            {this.renderAuthOptions()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default withRouter(Navigation);
