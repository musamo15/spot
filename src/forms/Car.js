import React, { Component } from 'react';

import Form from 'react-bootstrap/Form'

export default class Car extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attributes: {
        make: '',
        model: '',
        year: ''
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultValue !== this.props.defaultValue && this.props.defaultValue !== null) {
      this.setState({
        attributes: this.props.defaultValue
      });
      console.log(this.props.defaultValue)
    }
  }

  handleChange(event) {
    const attributes = { ...this.state.attributes, [event.target.name]: event.target.value }
    this.setState({
      attributes: attributes
    });
    this.props.addAttributes(attributes);
  }

  render() {
    return(
      <div>
        <Form.Group className='mb-3'>
          <Form.Label>Make</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter make'
            name='make'
            value={this.state.attributes.make}
            onChange={(event) => this.handleChange(event)}/>
        </Form.Group >

        <Form.Group className='mb-3'>
          <Form.Label>Model</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter model'
            name='model'
            value={this.state.attributes.model}
            onChange={(event) => this.handleChange(event)}/>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Year</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter year'
            name='year'
            value={this.state.attributes.year}
            onChange={(event) => this.handleChange(event)}/>
        </Form.Group>
      </div>
    );
  }

}
