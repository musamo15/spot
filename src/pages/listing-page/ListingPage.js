import React, { Component } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

import ErrorPage from 'src/pages/error-page/ErrorPage';

import { withRouter } from 'src/utilities/routing/withRouter.js';

import './ListingPage.css';

class ListingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      host: '',
      title: '',
      price: '',
      attributes: '',
      startDate: '',
      endDate: '',
      rentals: [],
      locationLat: '',
      locationLong: '',
      loading: true,
      valid: false,
      error: ''
    };
  }

  componentDidMount() {
    this.populateListing();
  }

  async populateListing() {

    try {
      const resp = await axios.get(`http://localhost:8000/listings/${this.props.params.listing_id}`, {params: {category: this.props.params.category_id}});

      this.setState({
        host: resp.data.host_id,
        title: resp.data.item_name,
        price: resp.data.item_price,
        attributes: resp.data.attributes,
        startDate: resp.data.start_date,
        endDate: resp.data.end_date,
        rentals: resp.data.rentals,
        locationLat: resp.data.locationLAT,
        locationLong: resp.data.locationLONG,
        loading: false,
        valid: (resp.status === 200)
      });
    } catch (err) {
      const msg = err.response ? 'category/listing does not exist' : err.message;

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

  redirectToEdit() {
    this.redirect(`/create-listing?category=${this.props.params.category_id}&listing_id=${this.props.params.listing_id}&mode=edit`)
  }

  render() {
    if (this.state.loading) {
      // loading screen is empty
      return (<></>);
    } else if (this.state.valid) {
      // render the listing page with data
      return (
        <div className='listing-page-container'>
          <div className='titles'>{this.state.title}</div>
          <div className='listing-row'>
            <Carousel className='mb-2' style={{ width: '800px' }} interval={null}>
             <Carousel.Item>
              <img
                src='https://i.guim.co.uk/img/media/3547ba0f293eb4702bab2d2c1aed323d9f9a255a/1139_892_3139_1884/master/3139.jpg?width=1200&quality=85&auto=format&fit=max&s=e9f0fd94d7bd8d489a7de6b76b241397'
                alt='Honda Type R'
                width='800px'
                height='400px'
                style={{ 'objectFit': 'cover' }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src='https://cimg0.ibsrv.net/ibimg/hgm/1920x1080-1/100/609/2017-honda-civic-sdn_100609652.jpg'
                alt='Honda Type R'
                width='800px'
                height='400px'
                style={{ 'objectFit': 'cover' }}
              />
            </Carousel.Item>
          </Carousel>
          <div className='rent-options'>
            <div className='edit-listing'>
              <div className={'edit mt-2'}>Rent Options</div>
                <Button variant='dark'  onClick={(e) => this.redirectToEdit()}>Edit</Button>
              </div>
            <div>Price</div>
            {this.state.price}
          </div>
        </div>
        <div>Listed by {this.state.host}</div>
          <div className='mt-4 titles'>
              Item Description
          </div>
          <div className='item-description'>
            {Object.entries(this.state.attributes).map(attribute =>
              <div key={attribute[0]}>
                <h3>{attribute[0]}</h3>
                <p>{attribute[1]}</p>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      // display error page - invalid category/listing or response
      return (<ErrorPage message={this.state.error}/>);
    }

  }

}

export default withRouter(ListingPage);
