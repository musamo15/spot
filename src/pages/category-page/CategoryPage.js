import React, { Component } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';

import ErrorPage from 'src/pages/error-page/ErrorPage';

import { withRouter } from 'src/utilities/routing/withRouter.js';
import { capitalFirst } from 'src/utilities/formatters/stringFormatter.js';

import './CategoryPage.css';

class CategoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      filters: {
        'price_min': 0,
        'price_max': 100000,
        'distance': '150',
        'start_date': '3000-01-01',
        'end_date': '1970-01-01'
      },
      sortedOn: 'None',
      zip: '08012',
      loading: true,
      valid: false,
      error: ''
    };

    this.defaultStartDate = '3000-01-01'
    this.defaultEndDate = '1970-01-01'
    this.populateListings = this.populateListings.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentDidMount() {
    this.populateListings();
  }

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
          images: listing.images,
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

    if (value === '') {
      if (target === 'distance') {
        value = '9999999999'
      }
      else if (target === 'price_min') {
        value = 0;
      }
      else if (target === 'price_max') {
        value = '9999999999'
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
      if (event.target.name === 'start_date') {
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

  updateZip(e) {
    this.setState({
      zip: e.target.value
    });
  }

  render() {
    if (this.state.loading) {
      // loading screen is empty
      return (<></>);
    } else if (this.state.valid) {
      // render the category page with listings
      return (
        <div className='whole-category-page-container'>
          <NavDropdown title='Sort & Filter' id='sorts-and-filters'>
            <Form>
              <div key={'radio'} className='mb-3 px-3'>
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

                <p id='filter'>Filter By:</p>
                <div id='price'>
                  <Form.Group className='mb-3 px-3' controlId='form-min-price'>
                    <Form.Label>Min Price</Form.Label>
                    <Form.Control name='price_min' type='text' placeholder='' onChange={(event) => this.handleFilterChange(event)} />
                  </Form.Group>

                  <Form.Group className='mb-3 px-3' controlId='form-max-price'>
                    <Form.Label>Max Price</Form.Label>
                    <Form.Control name='price_max' type='text' placeholder='' onChange={(event) => this.handleFilterChange(event)} />
                  </Form.Group>
                </div>

                <div id='availability' >
                  <Form.Group className='mb-3 px-3' controlId='form-min-day'>
                    <Form.Label>Availability Start Date</Form.Label>
                    <Form.Control name='start_date' type='date' placeholder='Enter Start Date' onChange={(event) => this.handleDateChange(event)} />
                  </Form.Group>
                  <Form.Group className='mb-3 px-3' controlId='form-max-day'>
                    <Form.Label>Availability End Date</Form.Label>
                    <Form.Control type='date' name='end_date' placeholder='Enter End Date' onChange={(event) => this.handleDateChange(event)} />
                  </Form.Group>
                </div>

                <div id='distance' >
                  <Form.Group className='mb-3 px-3' controlId='form-max-distance'>
                    <Form.Label>Max Distance</Form.Label>
                    <Form.Control name='distance' type='text' placeholder='Enter Maximum Distance' defaultValue={this.state.filters.price_max} onChange={(event) => this.handleFilterChange(event)} />
                  </Form.Group>

                <Form.Group className='mb-3 px-3'>
                  <Form.Label>Change Location</Form.Label>
                  <Form.Control type='text'
                    placeholder={this.state.zip}
                    onChange={e => this.updateZip(e)} />
                </Form.Group>
                </div>

                <Button variant='primary' id='search-button' disabled={(isNaN(this.state.zip)) || (this.state.zip.length !== 5)}
                  onClick={async () => { await this.populateListings() }} >
                  Search
                </Button>
              </div >
            </Form >
          </NavDropdown>
          <div className='layout-container'>
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
                    src={listing.images[0]}
                    alt={listing.images[0]}
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
