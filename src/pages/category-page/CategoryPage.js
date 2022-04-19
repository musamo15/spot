import React, { Component } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';

import ErrorPage from 'src/pages/error-page/ErrorPage';

import { withRouter } from 'src/utilities/routing/withRouter.js';
import { capitalFirst } from 'src/utilities/formatters/stringFormatter.js';

import './CategoryPage.css';

class CategoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      loading: true,
      valid: false,
      error: ''
    };
  }

  componentDidMount() {
    this.populateListings();
  }

  async populateListings() {
    const params = { category: this.props.params.category_id };
    try {
      const resp = await axios.get('http://localhost:8000/getAllListings', { params: params });

      let listings = [];
      for (let i = 0; i < resp.data.length; i++) {
        const listing = resp.data[i]
        listings.push({
          id: listing.listing_id,
          name: listing.item_name,
          price: listing.item_price
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
  }

  render() {
    if (this.state.loading) {
      // loading screen is empty
      return (<></>);
    } else if (this.state.valid) {
      // render the category page with listings
      return (
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
                  <Card.Subtitle className='mb-2 text-muted'>2 miles away</Card.Subtitle>
                  <Card.Text>${listing.price}/day</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      );
    } else {
      // display error page - invalid category or response
      return (<ErrorPage message={this.state.error}/>);
    }
  }

}

export default withRouter(CategoryPage);
