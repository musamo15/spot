import React, { Component } from 'react';
//import { CheckCircleFill } from 'react-bootstrap-icons';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { withRouter } from 'src/utilities/routing/withRouter.js';

import './RegistrationPage.css';

class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '', // user enterd first name
      lastName: '', // user entered last name
      email: '', // user entered email
      password: '', // user entered password
      confirmPassword: '', // user entered confirm password
      passwordContainsLowercase: false, // password requirement flag
      passwordContainsUppercase: false, // password requirement flag
      passwordContainsNumber: false, // password requirement flag
      passwordContainsSpecial: false, // password requirement flag
      passwordLengthOkay: false, // password requirement flag
      invalidEmail: false, // is the email invalid
      invalidPassword: false, // is the password invalid
      invalidConfirmPassword: false // do the passwords match
    };
  }

  updateFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  updateLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  updateEmail(e) {
    this.setState({
      email: e.target.value,
      invalidEmail: false
    });
  }

  updatePassword(e) {
    let pwd = e.target.value;
    this.setState({
      password: pwd,
      passwordContainsLowercase: this.passwordContainsLowercase(pwd),
      passwordContainsUppercase: this.passwordContainsUppercase(pwd),
      passwordContainsNumber: this.passwordContainsNumber(pwd),
      passwordContainsSpecial: this.passwordContainsSpecial(pwd),
      passwordLengthOkay: this.passwordLengthOkay(pwd),
      invalidPassword: false
    });
  }

  updateConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
      invalidConfirmPassword: false
    });
  }

  processSubmit() {
    let passwordValid = this.passwordValid();
    let passwordsMatch = this.passwordsMatch();
    if (passwordValid && passwordsMatch) {
      // create user
    } else {
      this.setState({
        invalidPassword: !passwordValid,
        invalidConfirmPassword: !passwordsMatch
      });
    }
  }

  redirect(path) {
    this.props.navigate('/');
  }

  passwordContainsLowercase(pwd) {
    var format = /[a-z]+/;
    return(format.test(pwd));
  }

  passwordContainsUppercase(pwd) {
    var format = /[A-Z]+/;
    return(format.test(pwd));
  }

  passwordContainsNumber(pwd) {
    var format = /[0-9]+/;
    return(format.test(pwd));
  }

  passwordContainsSpecial(pwd) {
    var format = /[!@#$%^&*()_+\-=[\]{};':'\\|,.<>/?]+/;
    return(format.test(pwd));
  }

  passwordLengthOkay(pwd) {
    return(pwd.length > 7);
  }

  passwordValid() {
    return(this.state.passwordContainsUppercase &&
      this.state.passwordContainsLowercase &&
      this.state.passwordContainsNumber &&
      this.state.passwordContainsSpecial &&
      this.state.passwordLengthOkay
    );
  }

  passwordsMatch() {
    return(this.state.password === this.state.confirmPassword);
  }

  renderPopover() {
    return(
      <Popover>
        <Popover.Body>
          <div className='popover-body-container'>
            <h6>Password Requirements</h6>
            <Form.Group className='mb-1'>
              <Form.Check type='checkbox'
                label='One uppercase character'
                checked={this.state.passwordContainsUppercase}/>
            </Form.Group>
            <Form.Group className='mb-1'>
              <Form.Check type='checkbox'
                label='One lowercase character'
                checked={this.state.passwordContainsLowercase}/>
            </Form.Group>
            <Form.Group className='mb-1'>
              <Form.Check type='checkbox'
                label='One number'
                checked={this.state.passwordContainsNumber}/>
            </Form.Group>
            <Form.Group className='mb-1'>
              <Form.Check type='checkbox'
                label='One special character'
                checked={this.state.passwordContainsSpecial}/>
            </Form.Group>
            <Form.Group className='mb-1'>
              <Form.Check type='checkbox'
                label='At least 8 characters'
                checked={this.state.passwordLengthOkay}/>
            </Form.Group>
          </div>
        </Popover.Body>
      </Popover>
    );
  }

  render() {
    return (
      <div className='registration-card'>
        <div className='mb-3 text-center'>
          <h2>Create New Account</h2>
        </div>
        <Form.Group className='mb-3'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text'
            placeholder='Enter first name'
            onChange={e => this.updateFirstName(e)}/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text'
            placeholder='Enter last name'
            onChange={e => this.updateLastName(e)}/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email'
            isInvalid={this.state.invalidEmail}
            placeholder='Enter email'
            onChange={e => this.updateEmail(e)}
            noValidate/>
          <Form.Control.Feedback type='invalid'>
            This email is invalid.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <OverlayTrigger trigger='focus'
            placement='right-end'
            overlay={this.renderPopover()}>
            <Form.Control type='password'
              isInvalid={this.state.invalidPassword}
              placeholder='Enter new password'
              onChange={evt => this.updatePassword(evt)}/>
          </OverlayTrigger>
          <Form.Control.Feedback type='invalid'>
            Password does not meet the minimum requirements.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password'
            isInvalid={this.state.invalidConfirmPassword}
            placeholder='Confirm password'
            onChange={e => this.updateConfirmPassword(e)}/>
          <Form.Control.Feedback type='invalid'>
            Passwords do not match.
          </Form.Control.Feedback>
        </Form.Group>
        <div className='d-grid gap-2'>
          <Button
            variant='success'
            disabled={!(this.state.firstName && this.state.lastName &&
              this.state.email && this.state.password &&
              this.state.confirmPassword)}
            onClick={() => this.processSubmit()}>
            Register
          </Button>
        </div>
        <div className='mt-3 text-center'>
          <a href='login' style={{textDecoration: 'none'}}>
            Already have an account?
          </a>
        </div>
      </div>
    );
  }

}

export default withRouter(Registration);
