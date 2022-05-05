import React, { Component } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { getUser, getAccessToken } from 'src/utilities/authentication/auth.js';

export default class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      oldData: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        name: '',
        phone: '',
        email: ''
      },
      readOnly: true,
      error: true
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.user !== prevProps.user) {
      this.setState({
        user: this.props.user,
      })
    }
  }

  async updateUserData() {
    const user = getUser();
    const token = getAccessToken();
    if (user !== null && token != null) {
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };

      const requestBody = {
        user_metadata: {
          phone: this.state.user.phone,
          address: {
            street1: this.state.user.street1,
            street2: this.state.user.street2,
            city: this.state.user.city,
            state: this.state.user.state,
            zip: this.state.user.zip,
            country: this.state.user.country
          }
        }
      };

      let success = false;
      try {
        const resp = await axios.put(`http://localhost:8000/users/${user.sub}`, requestBody, config);
        if (resp.status === 200) {
          success = true;
        }
      } catch(err) {
        // unprocessable
        console.log(err);
      }

      this.toggleEdit(success);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.updateUserData();
  }

  // capture a change in user input and update this.state
  handleChange(event) {
    const user = { ...this.state.user, [event.target.name]: event.target.value };
    this.setState({
      user: user
    });
  }

  toggleEdit(saved) {
    if (this.state.readOnly) { // moving into edit mode
      // copy user data to this.state.oldData
      this.setState({
        oldData: this.state.user
      });
    } else { // moving out of edit mode
      if (!saved) { // the user cancelled the update or it failed
        this.setState({
          user: this.state.oldData
        });
      }
    }

    // toggle edit mode
    this.setState({
      readOnly: !this.state.readOnly
    });
  }

  renderSaveButton() {
    if (!this.state.readOnly) {
      return (
        <Button className='me-3' variant='primary' type='submit'>
          Save
        </Button>
      );
    }
  }

  render() {
    return (
      <div className='user-profile-form'>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label className='required'>Name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='name'
                  onChange={(e) => this.handleChange(e)}
                  readOnly={true}
                  value={this.state.user.name}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='phone'>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type='text'
                  name='phone'
                  onChange={(e) => this.handleChange(e)}
                  readOnly={this.state.readOnly}
                  value={this.state.user.phone}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  onChange={(e) => this.handleChange(e)}
                  readOnly={true}
                  value={this.state.user.email}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='street1'>
                <Form.Label className='required'>Street 1</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='street1'
                  onChange={(e) => this.handleChange(e)}
                  readOnly={this.state.readOnly}
                  value={this.state.user.street1}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='street2'>
                <Form.Label>Street 2</Form.Label>
                <Form.Control
                  type='text'
                  name='street2'
                  onChange={(e) => this.handleChange(e)}
                  readOnly={this.state.readOnly}
                  value={this.state.user.street2}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className='mb-3' controlId='city'>
                <Form.Label className='required'>City</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='city'
                  onChange={(e) => this.handleChange(e)}
                  readOnly={this.state.readOnly}
                  value={this.state.user.city}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='state'>
                <Form.Label className='required'>State</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='state'
                  onChange={(e) => this.handleChange(e)}
                  readOnly={this.state.readOnly}
                  value={this.state.user.state}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className='mb-3' controlId='country'>
                <Form.Label className='required'>Country</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='country'
                  onChange={(e) => this.handleChange(e)}
                  readOnly={this.state.readOnly}
                  value={this.state.user.country}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='zip'>
                <Form.Label className='required'>Zip</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='zip'
                  onChange={(e) => this.handleChange(e)}
                  readOnly={this.state.readOnly}
                  value={this.state.user.zip}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            className='me-3'
            variant='primary'
            onClick={() => this.toggleEdit(false)}
          >
            {this.state.readOnly ? 'Edit' : 'Cancel'}
          </Button>
          {this.renderSaveButton()}
        </Form>
      </div>

    );
  }

}
