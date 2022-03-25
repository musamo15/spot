import React, { Component } from 'react';
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { login } from 'src/utilities/authentication/auth.js';
import { withRouter } from 'src/utilities/routing/withRouter.js';

import './LoginPage.css';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '', // user entered email
        password: '', // user entered password
        pwdField: 'password', // password text entry type
    };
  }

  updateEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  showHidePassword(e) {
    this.setState({
      pwdField: this.state.pwdField === 'text' ? 'password' : 'text'
    });
  }

  redirect(path) {
    this.props.navigate(path);
  }

  handleLogin() {
    login(this.state.email.trim(), this.state.password.trim());
  }

  render() {
    return (
      <div className='login-card'>
        <div className='mb-3 text-center'>
          <h1 style={{ cursor: 'pointer' }} onClick={() => this.redirect('/')}>
            SPOT
          </h1>
        </div>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              onChange={e => this.updateEmail(e)}/>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <InputGroup className='mb-3'>
              <Form.Control
                type={this.state.pwdField}
                placeholder='Enter password'
                onChange={e => this.updatePassword(e)}/>
              <Button
                variant='secondary'
                disabled={!this.state.password}
                onClick={e => this.showHidePassword(e)}>
                {this.state.pwdField === 'password' ?
                  <EyeSlashFill/> : <EyeFill/>}
              </Button>
            </InputGroup>
          </Form.Group>
          <div className='d-grid gap-2'>
            <Button variant='primary' onClick={() => this.handleLogin()}>
              Login
            </Button>
          </div>
        </Form>
        <div className='mt-3 text-center'>
          <a href='forgot-password' style={{ textDecoration: 'none' }}>
            Forgot Password?
          </a>
        </div>
        <hr/>
        <div className='d-grid gap-2'>
          <Button variant='success' onClick={() => this.redirect('/register')}>
            Register
          </Button>
        </div>
      </div>
    );
  }

}

export default withRouter(LoginPage);
