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
          price: listing.item_price
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
                src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
                alt='Model S'
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
                src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
                alt='Model S'
              />
              <Card.Body>
                <Card.Title>{listing.name}</Card.Title>
                <Card.Text>${listing.price}/day</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="tutorial">
          <h3 className='how-to'><b>How to use SPOT</b></h3>
          <div className="tutorial-item">
            <Card
              style={{ width: '20rem', cursor: 'pointer' }}
              onClick={e => this.redirect(`/login`)}
            >
              <Card.Img
                variant='top'
                src='https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png'
                alt='Model S'
              />
              <Card.Body className='cardbody'>
                <Card.Title>Register or Login</Card.Title>
                <Card.Text>Get started by registering an account or if you already have one, log in!</Card.Text>
              </Card.Body>
            </Card>

            <Card
              style={{ width: '20rem', cursor: 'pointer' }}
              onClick={e => this.redirect(`/login`)}
            >
              <Card.Img
                variant='top'
                src='https://icons.iconarchive.com/icons/cornmanthe3rd/squareplex/512/Utilities-google-calendar-icon.png'
                alt='Model S'
              />
              <Card.Body className='cardbody'>
                <Card.Title>Choose a Date</Card.Title>
                <Card.Text>Pick the days for which you want to rent an item.</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

      </div>

    );
  }

}

export default withRouter(HomePage);
