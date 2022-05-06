import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default class GenericForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [{
        itemAttribute: '',
        itemAttributeValue: ''
      }]
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      if (this.props.defaultValue !== null) {
        let data = this.props.defaultValue;
        let attributes = [];
        Object.keys(data).forEach(function(key) {
          attributes.push({ itemAttribute: key, itemAttributeValue: data[key]});
        });

        this.setState({
          item: attributes
        })
      }
    }
  }

  render() {
    return (
      <div className='mb-3'>
        {this.state.item.map((input, index) => {
          if(index === 0) {
            return (
              <div className='mb-3' key={index}>
                <Row>
                  <Col>
                    <Form.Label>Attributes</Form.Label>
                    <Form.Control
                      type='text'
                      name='itemAttribute'
                      placeholder='Enter Item Attribute'
                      value={input.itemAttribute}
                      onChange = {event => this.handleFormChange(index, event)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Values</Form.Label>
                    <Form.Control
                      type='text'
                      name='itemAttributeValue'
                      placeholder='Enter Item Attribute Value'
                      value={input.itemAttributeValue}
                      onChange = {event => this.handleFormChange(index, event)}
                    />
                  </Col>
                  <Col>
                  </Col>
                </Row>
              </div>
            );
          } else {
            return (
              <div className='mb-3' key={index}>
                <Row>
                  <Col>
                    <Form.Control
                      type='text'
                      name='itemAttribute'
                      placeholder='Enter Item Attribute'
                      value={input.itemAttribute}
                      onChange = {event => this.handleFormChange(index, event)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='text'
                      name='itemAttributeValue'
                      placeholder='Enter Item Attribute Value'
                      value={input.itemAttributeValue}
                      onChange = {event => this.handleFormChange(index, event)}
                    />
                  </Col>
                  <Col>
                    <Button variant='primary' size='sm' onClick={(event) => this.removeFields(index, event)}>Remove</Button>
                  </Col>
                </Row>
              </div>
            );
          }
        })}
        <Button variant='primary' onClick={this.addFields}>Add Attribute</Button>
      </div>
    );
  }

    convertToObject(event) {
        const object = {};
        for(var i = 0; i < this.state.item.length; i++) {
            const { itemAttribute, itemAttributeValue } = this.state.item[i];
            object[itemAttribute] = itemAttributeValue;
        }
        event.preventDefault();
        return object;
    }

    handleFormChange = (index, event) => {
        let data = [...this.state.item];
        data[index][event.target.name] = event.target.value;
        this.setState(data);
        this.props.addAttributes(this.convertToObject(event));
    }

    addFields = (event) => {
        this.setState(({
            item: [...this.state.item, {itemAttribute:'', itemAttributeValue:''}]
        }))
        event.preventDefault();
    }

    removeFields = (index, event) => {
        let item = this.state.item;
        item.splice(index, 1);
        this.setState({ item });
        event.preventDefault();
        this.props.addAttributes(this.convertToObject(event));
    }
}
