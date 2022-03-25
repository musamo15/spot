import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

import Navigation from 'src/components/navigation/Navigation';

import { withRouter } from 'src/utilities/routing/withRouter.js';

import './HomePage.css';

class HomePage extends Component {

  redirect(path) {
    this.props.navigate(path);
  }

  render() {
    return(
      <div className='navbar-container'>
        <Navigation/>
        <div className='home-page-container'>
          <Carousel className='mb-4'>
            <Carousel.Item interval={10000}>
              <img
                src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
                alt='Model S'
                width='1200px'
                height='400px'
                style={{'objectFit': 'cover'}}
              />
              <Carousel.Caption>
                <h3>Model S</h3>
                <p>Starting at $30/day</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
              <img
                src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/cd83892a-610a-4e31-aadc-cb837ec68fe2.jpg?v=25&dpr=200'
                alt='Cybertruck'
                width='1200px'
                height='400px'
                style={{'objectFit': 'cover'}}
              />
              <Carousel.Caption>
                <h3>Cybertruck</h3>
                <p>Starting at $50/day</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <h5>Popular Listings</h5>
          <div className='card-row'>
            <Card style={{ width: '14rem', cursor: 'pointer' }} onClick={e => this.redirect('category/listing/id')}>
              <Card.Img
                variant='top'
                src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
                alt='Model S'
              />
              <Card.Body>
                <Card.Title>Model S</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>15.3 miles away</Card.Subtitle>
                <Card.Text>
                  $30/day
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '14rem', cursor: 'pointer' }} onClick={e => this.redirect('category/listings/id')}>
              <Card.Img
                variant='top'
                src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/cd83892a-610a-4e31-aadc-cb837ec68fe2.jpg?v=25&dpr=200'
                alt='Cybertruck'
              />
              <Card.Body>
                <Card.Title>Cybertruck</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>11.8 miles away</Card.Subtitle>
                <Card.Text>
                  $55/day
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '14rem', cursor: 'pointer' }} onClick={e => this.redirect('category/listings/id')}>
              <Card.Img
                variant='top'
                src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
                alt='Model S'
              />
              <Card.Body>
                <Card.Title>Model S</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>15.3 miles away</Card.Subtitle>
                <Card.Text>
                  $30/day
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '14rem', cursor: 'pointer' }} onClick={e => this.redirect('category/listings/id')}>
              <Card.Img
                variant='top'
                src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/cd83892a-610a-4e31-aadc-cb837ec68fe2.jpg?v=25&dpr=200'
                alt='Cybertruck'
              />
              <Card.Body>
                <Card.Title>Cybertruck</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>11.8 miles away</Card.Subtitle>
                <Card.Text>
                  $55/day
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '14rem', cursor: 'pointer' }} onClick={e => this.redirect('category/listings/id')}>
              <Card.Img
                variant='top'
                src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
                alt='Model S'
              />
              <Card.Body>
                <Card.Title>Model S</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>15.3 miles away</Card.Subtitle>
                <Card.Text>
                  $30/day
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '14rem', cursor: 'pointer' }} onClick={e => this.redirect('category/listings/id')}>
              <Card.Img
                variant='top'
                src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/cd83892a-610a-4e31-aadc-cb837ec68fe2.jpg?v=25&dpr=200'
                alt='Cybertruck'
              />
              <Card.Body>
                <Card.Title>Cybertruck</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>11.8 miles away</Card.Subtitle>
                <Card.Text>
                  $55/day
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(HomePage);
