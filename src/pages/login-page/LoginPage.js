import React, { Component } from 'react';
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import './LoginPage.css';

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '', // user entered email
        password: '', // user entered password
        persist: false, // remember me auth persistence
        pwdField: 'password', // password field entry type
    };
  }

  // update the email field internal state
  updateEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  // update the password field internal state
  updatePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  // update the persist field (remember me) interal state
  updatePersist(e) {
    this.setState({
      persist: !this.state.persist
    });
  }

  // show or hide the password field entry contents
  showHidePassword(e) {
    this.setState({
      pwdField: this.state.pwdField === 'text' ? 'password' : 'text'
    });
  }

  render() {
    return (
      <div className='login-card'>
        <div className='mb-3 text-center'>
          <h1>SPOT</h1>
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
          <Form.Group className='mb-3'>
            <Form.Check type='checkbox'
              label='Remember me'
              onClick={e => this.updatePersist(e)}/>
          </Form.Group>
          <div className='d-grid gap-2'>
            <Button variant='primary'>Login</Button>
          </div>
        </Form>
        <div className='mt-3 text-center'>
          <a href='forgot-password' style={{textDecoration: 'none'}}>
            Forgot Password?
          </a>
        </div>
        <hr/>
        <div className='d-grid gap-2'>
          <Button variant='success'>Register</Button>
        </div>
      </div>
    );
  }

}
