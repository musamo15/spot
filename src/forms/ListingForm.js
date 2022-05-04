import React, { Component } from 'react';
import axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Calendar from 'react-calendar';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import Car from 'src/forms/Car';

import { withRouter } from 'src/utilities/routing/withRouter.js';

import './ListingForm.css';

class ListingForm extends Component {

    constructor(props) {
      super(props);
      this.state = {
        mode: this.props.mode,
        category: this.props.category,
        item_name: String,
        item_price: String,
        start_date: String,
        end_date: String,
        attributes: {},
        address: {
          street: String,
          city: String,
          zip: String,
          state: String
        }
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddressChange(event) {
        const newAddr = { ...this.state.address, [event.target.name]: event.target.value }

        this.setState({ address: newAddr })

    }

    handleDateChange(event) {
        const start = event[0]
        const end = event[event.length - 1]

        this.setState({
            start_date: start.getFullYear() + "-" + (("0" + (start.getMonth() + 1)).slice(-2)) + "-" + ("0" + (start.getDate())).slice(-2) + "T00:00:01.000+00:00",
            end_date: end.getFullYear() + "-" + (("0" + (end.getMonth() + 1)).slice(-2)) + "-" + ("0" + (end.getDate())).slice(-2) + "T23:59:59.000+00:00"
        })

    }


    handleSubmit(event) {
        const info = {
            host_id: "",
            category: "Test",
            item_name: this.state.item_name,
            item_price: this.state.item_price,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            attributes: this.state.attributes,
            address: {
                street: this.state.address.street,
                city: this.state.address.city,
                zip: this.state.address.zip,
                state: this.state.address.state,

            }
        }

        console.log(info)



        axios.post("http://localhost:8000/createListing", info)




    }

    handleAttributeUpdate = (newAttributes) => {
        this.setState({ attributes: newAttributes });
    }

    renderCategory() {
        switch (this.state.category) {
            case 'generic':
                return this.renderGenericListings();
            case 'car':
                return (<Car addAttributes={this.handleAttributeUpdate} />);
            default:
                break;
        }
    }

    renderGenericListings() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
            </Form>
        );
    }

    render() {
        return (
            <Stack gap={4}>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <Accordion defaultActiveKey={['0', '1', '2', '3', '4']} alwaysOpen flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Listing Name</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Control required name="item_name" type="text" placeholder="Enter the name of your listing" onChange={(event) => this.handleChange(event)} />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Daily Price</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Control required name="item_price" type="text" placeholder="$0.00" onChange={(event) => this.handleChange(event)} />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Availability</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className="mb-3" controlId="">
                                    <Stack direction="horizontal" gap={3}>

                                        <Form.Group className="mb-3" controlId="">
                                            <Calendar calendarType='US'
                                                showNeighboringMonth={false}
                                                returnValue='range'
                                                selectRange
                                                required
                                                minDate={new Date()}
                                                onChange={(event) => this.handleDateChange(event)}

                                            />
                                        </Form.Group>
                                    </Stack>
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Listing Address</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className="mb-3" controlId="">
                                    <Stack gap={3} >
                                        <Form.Text className="text-muted">
                                            Your address will not be available to the public
                                        </Form.Text>
                                        <Form.Control required name="street" type="text" placeholder="Street" onChange={(event) => this.handleAddressChange(event)} />
                                        <Form.Control required name="city" type="text" placeholder="City" onChange={(event) => this.handleAddressChange(event)} />
                                        <Form.Control required name="state" type="text" placeholder="State" onChange={(event) => this.handleAddressChange(event)} />
                                        <Form.Control required name="zip" type="text" placeholder="Zip" onChange={(event) => this.handleAddressChange(event)} />
                                    </Stack>
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Category</Accordion.Header>
                            <Accordion.Body>
                                <Form.Select
                                    defaultValue={'unselected'}
                                    onChange={(e) => this.setState({ category: e.target.value })}
                                    aria-label="Default select example">
                                    <option disabled value='unselected'>Select a Category</option>
                                    <option value='generic'>Generic</option>
                                    <option value='car'>Car</option>
                                    <option value='ladders'>Ladders</option>
                                </Form.Select>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="5">
                            <Accordion.Header>Additional</Accordion.Header>
                            <Accordion.Body>
                                {this.renderCategory()}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Stack>
        );
    }

}
export default withRouter(ListingForm)