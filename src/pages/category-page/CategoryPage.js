import React, { Component } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';

import ErrorPage from 'src/pages/error-page/ErrorPage';

import { withRouter } from 'src/utilities/routing/withRouter.js';
import { capitalFirst } from 'src/utilities/formatters/stringFormatter.js';

import './CategoryPage.css';
import { Form } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

class CategoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      filters: {
        "price_min": 0,
        "price_max": 100000,
        "distance": "150",
        "start_date": "3000-01-01",
        "end_date": "1970-01-01"
      },
      sortedOn: 'None',
      zip: "08012",
      loading: true,
      valid: false,
      error: ''
    };

    this.defaultStartDate = "3000-01-01"
    this.defaultEndDate = "1970-01-01"
    this.populateListings = this.populateListings.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentDidMount() {
    this.populateListings();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.filters !== this.state.filters ||
  //     prevState.sortedOn !== this.state.sortedOn) {
  //     //Make new API call
  //     this.populateListings();
  //   }
  // }

  async populateListings() {

    const params = {
      category: this.props.params.category_id,
      sortedOn: this.state.sortedOn,
      zip: this.state.zip
    };
    const filters = this.state.filters;
    try {
      const resp = await axios.put('http://localhost:8000/listingsSorted', filters, { params: params });

      let listings = [];
      for (let i = 0; i < resp.data.length; i++) {
        const listing = resp.data[i]
        listings.push({
          id: listing.listing_id,
          name: listing.item_name,
          price: listing.item_price,
          distance: listing.distance
        });
      }

      this.setState({
        listings: listings,
        loading: false,
        valid: (resp.status === 200)
      });
    } catch (err) {
      const msg = err.response ? 'category does not exist' : err.message;

      this.setState({
        loading: false,
        valid: false,
        error: msg
      });
    }
  }

  redirect(path) {
    this.props.navigate(path);
    console.log(path)
  }

  handleFilterChange(event) {
    var target = event.target.name
    var value = event.target.value

    if (value === "") {
      if (target === "distance") {
        value = "9999999999"
      }
      else if (target === "price_min") {
        value = 0;
      }
      else if (target === "price_max") {
        value = "9999999999"
      }
    }

    const newFilters = { ...this.state.filters, [event.target.name]: value }
    this.setState({ filters: newFilters })
  }


  handleChange(event) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;
    this.setState({ filters: { ...this.state.filters, [fieldName]: fieldVal } })
  }

  handleDateChange(event) {
    var newFilters

    if (event.target.value === '') {
      if (event.target.name === "start_date") {
        newFilters = { ...this.state.filters, [event.target.name]: this.defaultStartDate }
      }
      else {
        newFilters = { ...this.state.filters, [event.target.name]: this.defaultEndDate }
      }
    }

    else {
      newFilters = { ...this.state.filters, [event.target.name]: event.target.value }
    }

    this.setState({ filters: newFilters })

    console.log(this.state.filters)

  }

  render() {
    if (this.state.loading) {
      // loading screen is empty
      return (<></>);
    } else if (this.state.valid) {
      // render the category page with listings
      return (
        <div className='whole-category-page-container'>
          <NavDropdown title='Sort & Filter' id='collapsible-nav-sorting'>
            <Form>
              <div key={'radio'} className="mb-3">
                <p id='sort'>Sort By:</p>
                <Form.Check
                  type='radio'
                  id='location'
                  label='Location'
                  name='sort-group'
                  onChange={e => this.setState({ sortedOn: 'distance' })}
                />

                <Form.Check
                  type='radio'
                  id='low price'
                  label='Price Low To High'
                  name='sort-group'
                  onChange={e => this.setState({ sortedOn: 'priceLowToHigh' })}
                />

                <Form.Check
                  type='radio'
                  id='high price'
                  label='Price High To Low'
                  name='sort-group'
                  onChange={e => this.setState({ sortedOn: 'priceHighToLow' })}
                />

                <Form.Check
                  type='radio'
                  id='none'
                  label='No Sorting'
                  name='sort-group'
                  onChange={e => this.setState({ sortedOn: 'None' })}
                />

                <br />
                <p id='filter'>Filter By:</p>
                <Form.Check
                  type='checkbox'
                  id='location filter'
                  label='Location'
                  name='filter-group'
                  onClick={e => document.getElementById('distance').classList.toggle('hide')}
                />
                <div id='distance' class='hide'>
                  <Form.Group className='mb-3' controlId='form-max-distance'>
                    <Form.Label>Max Distance</Form.Label>
                    <Form.Control name="distance" type='text' placeholder='Enter Maximum Distance' defaultValue={this.state.filters.price_max} onChange={(event) => this.handleFilterChange(event)} />
                  </Form.Group>
                </div>

                <Form.Check
                  type='checkbox'
                  id='price filter'
                  label='Price'
                  name='filter-group'
                  onClick={e => document.getElementById('price').classList.toggle('hide')}
                />
                <div id='price' class='hide'>
                  <Form.Group className='mb-3' controlId='form-min-price'>
                    <Form.Label>Min Price</Form.Label>
                    <Form.Control name="price_min" type='text' placeholder='Enter Minimum Price' onChange={(event) => this.handleFilterChange(event)} />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='form-max-price'>
                    <Form.Label>Max Price</Form.Label>
                    <Form.Control name="price_max" type='text' placeholder='Enter Maximum Price' onChange={(event) => this.handleFilterChange(event)} />
                  </Form.Group>
                </div>

                <Form.Check
                  type='checkbox'
                  id='availability filter'
                  label='Availability'
                  name='filter-group'
                  onClick={e => document.getElementById('availability').classList.toggle('hide')}
                />
                <div id='availability' class='hide'>
                  <Form.Group className='mb-3' controlId='form-min-day'>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control name="start_date" type='date' placeholder='Enter Start Date' onChange={(event) => this.handleDateChange(event)} />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='form-max-day'>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type='date' name="end_date" placeholder='Enter End Date' onChange={(event) => this.handleDateChange(event)} />
                  </Form.Group>
                </div>
                <Button variant="primary" onClick={async () => { await this.populateListings() }} >
                  Search
                </Button>
              </div >
            </Form >
          </NavDropdown>
          <div className='category-page-container'>
            <h1>{capitalFirst(this.props.params.category_id)}</h1>
            <h5>All Listings</h5>
            <div className='card-row'>
              {this.state.listings.map((listing) => (
                <Card
                  style={{ width: '14rem', cursor: 'pointer' }}
                  onClick={e => this.redirect(`/categories/${this.props.params.category_id}/listings/${listing.id}`)}
                >
                  <Card.Img
                    variant='top'
                    src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
                    alt='Model S'
                  />
                  <Card.Body>
                    <Card.Title>{listing.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>{listing.distance} miles away</Card.Subtitle>
                    <Card.Text>${listing.price}/day</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div >
        </div>
      );
    } else {
      // display error page - invalid category or response
      return (<ErrorPage message={this.state.error} />);
    }
  }

}

export default withRouter(CategoryPage);
//                onClick={e => this.redirect(`/listings/${listing.id}'category=${this.props.params.category_id}`)}