import axios from 'axios';
import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

import { withRouter } from 'src/utilities/routing/withRouter.js';

import './HomePage.css';

class HomePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listings: []
    }
    this.populateListings = this.populateListings.bind(this)
  }

  redirect(path) {
    this.props.navigate(path);
  }

  componentDidMount() {
    this.populateListings()
  }

  async populateListings() {
    try {
      const resp = await axios.get('http://localhost:8000/listings?category=tests')
      let listings = []

      for (let i = 0; i < resp.data.length; i++) {
        const listing = resp.data[i]

        listings.push({
          id: listing.listing_id,
          name: listing.item_name,
          price: listing.item_price,
          images: listing.images
        })

      }

      this.setState({ listings: listings })
    } catch (err) {

    }


  }

  render() {
    return (
      <div className='layout-container'>
        <Carousel className='mb-4'>
          {this.state.listings.filter((item, idx) => idx < 4).map((listing) =>
            <Carousel.Item key={listing.id} interval={10000}
              onClick={e => this.redirect(`/categories/tests/listings/${listing.id}`)}
            >
              <img
                src={listing.images[0]}
                alt={listing.images[0]}
                width='1200px'
                height='400px'
                style={{ 'objectFit': 'cover' }}
              />
              <Carousel.Caption>
                <h3>{listing.name}</h3>
                <p>${listing.price}/day</p>
              </Carousel.Caption>
            </Carousel.Item>


          )}
        </Carousel>
        <h5>Popular Listings</h5>
        <div className='card-row'>
          {this.state.listings.map((listing) => (
            <Card key={listing.id}
              style={{ width: '14rem', cursor: 'pointer' }}
              onClick={e => this.redirect(`/categories/tests/listings/${listing.id}`)}
            >
              <Card.Img
                variant='top'
                src={listing.images[0]}
                alt={listing.images[0]}
              />
              <Card.Body>
                <Card.Title>{listing.name}</Card.Title>
                <Card.Text>${listing.price}/day</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }

}

export default withRouter(HomePage);
