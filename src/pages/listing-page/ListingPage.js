import React, { Component } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal'

import ErrorPage from 'src/pages/error-page/ErrorPage';

import { withRouter } from 'src/utilities/routing/withRouter.js';

import './ListingPage.css';
import { Calendar } from 'react-calendar';
import { isAuthenticated } from 'src/utilities/authentication/auth.js';
import { getUser, getAccessToken } from 'src/utilities/authentication/auth.js';

class ListingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      host: '',
      host_name: '',
      title: '',
      price: '',
      attributes: '',
      startDate: new Date(),
      endDate: new Date(),
      rentals: [],
      locationLat: '',
      locationLong: '',
      loading: true,
      valid: false,
      error: '',
      rent_start_date : new Date(),
      rent_end_date: new Date(),
      show: false
    };

    this.disableDates = this.disableDates.bind(this);
    this.handleRental = this.handleRental.bind(this);
    this.findMinDate = this.findMinDate.bind(this);
   
  }


  findMinDate()
  {
    if(this.state.startDate < new Date())
    {
      return new Date()
    }
    return this.state.startDate
  }

  componentDidMount() {
    this.populateListing();
  }

  handleDateSelection(event)
  {
    var selectedStart = event[0]
    var selectedEnd = event[1]
    var rentals = this.state.rentals
    selectedStart.setHours(0,0,0)
    selectedEnd.setHours(0,0,0)

    for(var i =0; i < rentals.length; i++)
    {
      var start = new Date(rentals[i].start_date)
      var end = new Date(rentals[i].end_date)

      start.setHours(0,0,0)
      end.setHours(0,0,0)

      if(selectedStart <= end && start <= selectedEnd)
      {
        alert("Invalid date selected")
        this.setState({
      
          rent_start_date: new Date(),
          rent_end_date: new Date()
        })
        window.location.reload(false)
        return 
      }

    }

    this.setState({
      
      rent_start_date: selectedStart,
      rent_end_date: selectedEnd
    })
  }

  async handleRental(event)
  {
    if (!isAuthenticated())
    {
      alert("You arent logged in!")
      
    }
    else
    {
      const user = getUser()

      const today = new Date()
      var start = this.state.rent_start_date
      var end = this.state.rent_end_date

      today.setHours(0,0,0)
      start.setHours(0,0,0)
      end.setHours(0,0,0)

      today.setMilliseconds(0)
      start.setMilliseconds(0)
      end.setMilliseconds(0)

      if(today.getTime() === start.getTime() || today.getTime() === end.getTime())
      {
        alert("Invalid date selection")
        window.location.reload(false)
        return
      }


      const params = {
        category: this.props.params.category_id,
        
        start_date: new Date(this.state.rent_start_date).toISOString(),
        end_date: new Date(this.state.rent_end_date).toISOString(),
        lessee_id: user.sub
      };
      
      const token = getAccessToken();
      if (user !== null && token != null) {
        const config = {
          headers: {
            Authorization: "Bearer " + token
          }
      }
      const requestbody = {}
      const resp = await axios.put(`http://localhost:8000/listings/${this.props.params.listing_id}/rent?category=${params.category}&start_date=${params.start_date}&end_date=${params.end_date}&lessee_id=${params.lessee_id}`, requestbody, config )
      this.props.navigate("/profile")
    }


    }
  }

  disableDates({date})
  {
    var rentals = this.state.rentals

    for(var i = 0; i < rentals.length; i++)
    {
      var start = new Date(rentals[i].start_date)
      var end = new Date(rentals[i].end_date)

      start.setHours(0,0,0)
      end.setHours(0,0,0)

      if(date >= start && date <= end)
      {
        return true
      }
      

    }
  }

  async populateListing() {
    const params = {
      category: this.props.params.category_id,
      listingId: this.props.params.listing_id
    };
    try {
      const resp = await axios.get(`http://localhost:8000/listings/${params.listingId}?category=${params.category}`);

      this.setState({
        host: resp.data.host_id,
        host_name: resp.data.host_name,
        title: resp.data.item_name,
        price: resp.data.item_price,
        attributes: resp.data.attributes,
        startDate: new Date(resp.data.start_date),
        endDate: new Date(resp.data.end_date),
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
      const user = getUser()
      const token = getAccessToken();
      if (user !== null && token != null) {
        const config = {
          headers: {
            Authorization: "Bearer " + token
          }
      }
      if(user.sub === this.state.host) {
        this.redirect(`/create-listing?category=${this.props.params.category_id}&listing_id=${this.props.params.listing_id}&mode=edit`, config)
      } else {
        alert("You can't edit this listing")
      }
    }
  }

  deleteListing() {
      const user = getUser()
      const token = getAccessToken();
      if (user !== null && token != null) {
        const config = {
          headers: {
            Authorization: "Bearer " + token
          }
      }
      if (this.state.host === user.sub) {
        axios.delete(`http://localhost:8000/listings/${this.props.params.listing_id}?category=${this.props.params.category_id}`, config).then(() => {console.log('Delete successful');})
        this.redirect(`/profile`) 
      }
      else {
        alert("You're not the owner of this listing")
      }
    }
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleShow() {
    this.setState({ show: true })
  }

  render() {
    var user = getUser()

    if(user == null)
    {
      user = {
        "sub": ""
      }
    }


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
          <div className={'edit mt-2'} id='rent-option-label'>Rent Options</div>
            <div>Price</div>
            <div className='price-per-day'><b>${this.state.price}</b>/ day</div>
            
            <Calendar
              caldendarType = 'US'
              showNeighboringMonth = {false}
              minDate = {this.findMinDate()}
              maxDate = {this.state.endDate}
              tileDisabled={this.disableDates}
              selectRange
              returnValue = "range"
              onChange={(event) => this.handleDateSelection(event)}
              allowPartialRange = {false}
            />
            <div className='edit-listing'>
                <div className='rent-buttons'>
                {user.sub === this.state.host ? <Button variant='dark' onClick={() => this.redirectToEdit()}>Edit</Button> : null}
                {user.sub === this.state.host ? <Button variant='dark' onClick={() => this.deleteListing()}>Delete</Button> : null}
                </div>
            </div>
            {user.sub === this.state.host ? null : <Button variant='dark' onClick={() => this.handleShow()}>Rent</Button>}
            <Modal centered show={this.state.show} onHide={() => this.handleClose()}>
              <Modal.Header closeButton>
                <Modal.Title>Rental Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                You are about to rent {this.state.title} from {this.state.rent_start_date.toDateString()} to {this.state.rent_end_date.toDateString()} for ${this.state.price}.
                <br/>
                <br/>
                Would you like to proceed?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleClose()}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={this.handleRental}>
                  Rent
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div>Listed by <b>{this.state.host_name}</b></div>
          <div className='mt-4 titles'>
              Item Description
          </div>
          <div className='item-description'>
            {Object.entries(this.state.attributes).map(attribute =>
              <div key={attribute[0]} className='attributes'>
                <p className='attribute'>{attribute[0]}:</p>
                <p className='attribute'>{attribute[1]}</p>
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