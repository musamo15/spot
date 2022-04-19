import React, { Component } from 'react';

import Form from 'react-bootstrap/Form'

export default class Car extends Component {

  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
      year: '',
      makeError: '',
      modelError: '',
      yearError: '',
      attributes: {}
    };
  }

  validate() {
    let makeError = '';
    let modelError = '';
    let yearError = '';

    if (this.state.make === '') {
      makeError = 'Please enter Make'
    }

    if (this.state.model === '') {
      modelError = 'Please enter Model'
    }

    if (this.state.year === '') {
      yearError = 'Please enter Year'
    }

    if (makeError || modelError || yearError) {
      this.setState({ makeError, modelError, yearError});
      return false;
    }

    return true;
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value },
      () => {
        this.props.addAttributes(this.handleState());
      }
    );
  }


  handleState() {
    let copy = Object.fromEntries(Object.entries(this.state));
    let attr = copy.attributes;
    for (const property in attr) {
      copy[property] = attr[property];
    }
    delete copy.attributes;
    return copy;
  }

  render() {
    return(
      <div>
        <Form.Group className='mt-3'>
          <Form.Label>Make</Form.Label>
          {this.state.makeError ? <div style={{ color: 'red' }}>{this.state.makeError}</div> : null}
          <Form.Control
            required
            type='text'
            placeholder='Enter make'
            name='Make'
            value={this.state.Make}
            onChange={(event) => this.handleChange(event)}/>
        </Form.Group >

        <Form.Group className='mt-3'>
          <Form.Label>Model</Form.Label>
          {this.state.modelError ? <div style={{ color: 'red' }}>{this.state.modelError}</div> : null}
          <Form.Control
            required
            type='text'
            placeholder='Enter model'
            name='Model'
            value={this.state.Model}
            onChange={(event) => this.handleChange(event)}/>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Year</Form.Label>
          {this.state.yearError ? <div style={{ color: 'red' }}>{this.state.yearError}</div> : null}
          <Form.Control
            required
            type='text'
            placeholder='Enter year'
            name='Year'
            value={this.state.Year}
            onChange={(event) => this.handleChange(event)}/>
        </Form.Group>
      </div>
    );
  }

}
