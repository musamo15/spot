import React, { Component } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Calendar from 'react-calendar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Car from 'src/forms/Car';
import FileUpload from 'src/components/uploads/FileUpload';
import Generic from 'src/forms/GenericForm';

import { withRouter } from 'src/utilities/routing/withRouter.js';
import { getUser, getAccessToken } from 'src/utilities/authentication/auth.js';

import './ListingForm.css';

class ListingForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
      category: this.props.category,
      item_name: '',
      item_price: '',
      start_date: '',
      end_date: '',
      attributes: {},
      images: [],
      address: {
        street: '',
        city: '',
        zip: '',
        state: ''
      }
    }
    this.handleAttributeUpdate = this.handleAttributeUpdate.bind(this);
    this.updateImageUrls = this.updateImageUrls.bind(this);
  }

  componentDidMount() {
    const params = {
      category: this.state.category
    };

    if (this.state.mode === 'edit') {
      axios.get(`http://localhost:8000/listings/${this.props.listingId}`, { params: params })
        .then(response => {
          this.setState(response.data);
      });
    }
  }

  async handleSubmit(event) {
    if (this.state.mode === 'edit') {
      this.handleSubmitUpdate(event);
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    const user = getUser();
    const token = getAccessToken();
    if (user !== null && token != null) {
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };

      const info = {
        host_id: user.sub,
        category: this.state.category,
        item_name: this.state.item_name,
        item_price: this.state.item_price,
        start_date: new Date(this.state.start_date),
        end_date: new Date(this.state.end_date),
        attributes: this.state.attributes,
        images: this.state.images,
        address: {
          street1: this.state.address.street,
          city: this.state.address.city,
          zip: this.state.address.zip,
          state: this.state.address.state,
          country: 'United States'
        }
      }
      const resp = await axios.post("http://localhost:8000/listings", info, config);
      this.redirect(`/categories/${resp.data.category}/listings/${resp.data.listing_id}`);
    }
  }

  async handleSubmitUpdate(event) {
    event.preventDefault();
    event.stopPropagation();

    const user = getUser();
    const token = getAccessToken();
    if (user !== null && token != null) {
      const config = {
        headers: {
          Authorization: "Bearer " + token
        },
        params: {
          category: this.state.category
        }
      };
      const info = {
        host_id: user.sub,
        item_name: this.state.item_name,
        item_price: this.state.item_price,
        start_date: new Date(this.state.start_date),
        end_date: new Date(this.state.end_date),
        attributes: this.state.attributes
      };
      const resp = await axios.put(`http://localhost:8000/listings/${this.props.listingId}`, info, config);
      this.redirect(`/categories/${resp.data.category}/listings/${resp.data.listing_id}`);
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddressChange(event) {
    this.setState({
      address: { ...this.state.address, [event.target.name]: event.target.value }
    });
  }

  handleDateChange(event) {
    const start = event[0];
    const end = event[event.length - 1];

    this.setState({
      start_date: start.getFullYear() + "-" + (("0" + (start.getMonth() + 1)).slice(-2)) + "-" + ("0" + (start.getDate())).slice(-2) + "T00:00:01.000+00:00",
      end_date: end.getFullYear() + "-" + (("0" + (end.getMonth() + 1)).slice(-2)) + "-" + ("0" + (end.getDate())).slice(-2) + "T23:59:59.000+00:00"
    });
  }

  handleAttributeUpdate(attributes) {
    this.setState({
      attributes: attributes
    });
  }

  updateImageUrls(urls) {
    this.setState({
      images: urls
    });
  }

  redirect(path) {
    this.props.navigate(path);
  }

  renderCategoryFields() {
    switch (this.state.category) {
      case null:
        return (<></>);
      case '':
        return (<></>);
      case 'cars':
        return (<Car defaultValue={this.state.attributes} addAttributes={this.handleAttributeUpdate} />);
      default:
        return (<Generic defaultValue={this.state.attributes} addAttributes={this.handleAttributeUpdate} />);
    }
  }

  renderCalendar() {
    if (this.state.start_date !== '' && this.state.end_date !== '') {
      // idk why this is needed to make the calendar work correct but leave it alone and fuck off
      let date1 = new Date(this.state.start_date);
      date1.setDate(date1.getDate() + 1);

      return (
        <Calendar
          calendarType='US'
          showNeighboringMonth={false}
          returnValue='range'
          selectRange
          minDate={new Date()}
          value={[date1, new Date(this.state.end_date)]}
          onChange={(event) => this.handleDateChange(event)}
        />
      );
    } else {
      return (
        <Calendar
          calendarType='US'
          showNeighboringMonth={false}
          returnValue='range'
          selectRange
          minDate={new Date()}
          onChange={(event) => this.handleDateChange(event)}
        />
      );
    }
  }

  renderAddressForm() {
    if (this.state.mode === 'create') {
      return (
        <div className='address-form'>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="listingStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  required
                  name="street"
                  type="text"
                  placeholder="Street"
                  onChange={(event) => this.handleAddressChange(event)}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="listingCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  name="city"
                  type="text"
                  placeholder="City"
                  onChange={(event) => this.handleAddressChange(event)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="listingState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  name="state"
                  type="text"
                  placeholder="State"
                  onChange={(event) => this.handleAddressChange(event)}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="listingZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  required
                  name="zip"
                  type="text"
                  placeholder="Zip"
                  onChange={(event) => this.handleAddressChange(event)}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      );
    }
  }

  render() {
    return (
      <Form onSubmit={(event) => this.handleSubmit(event)}>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='listingCategory'>
              <Form.Label>Listing Category</Form.Label>
              <Form.Select
                required
                defaultValue={this.props.category}
                onChange={(e) => this.setState({ category: e.target.value })}
              >
                <option value=''>None</option>
                <option value='cars'>Car</option>
                <option value='tests'>Test</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="listingName">
              <Form.Label>Listing Title</Form.Label>
              <Form.Control
                required
                type='text'
                name="item_name"
                placeholder="Enter the name of your listing"
                defaultValue={this.state.item_name}
                onChange={(event) => this.handleChange(event)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="listingPrice">
              <Form.Label>Listing Daily Price</Form.Label>
              <Form.Control
                required
                name="item_price"
                type="text"
                placeholder="$0.00"
                defaultValue={this.state.item_price}
                onChange={(event) => this.handleChange(event)}
              />
            </Form.Group>

            <FileUpload
              required={this.state.mode === 'create'}
              disabled={this.state.mode === 'edit'}
              multiple
              accept='image/*'
              onUpload={(urls) => this.updateImageUrls(urls)}
              label='Listing Images'
            />
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="listingAvailability">
              <Form.Label>Listing Availability</Form.Label>
              {this.renderCalendar()}
            </Form.Group>
          </Col>
        </Row>

        {this.renderAddressForm()}
        {this.renderCategoryFields()}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }

}

export default withRouter(ListingForm)
