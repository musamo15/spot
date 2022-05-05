import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import UserProfile from 'src/forms/users/UserProfile';
import ListingRow from 'src/components/listingRow/ListingRow';

import { isAuthenticated } from 'src/utilities/authentication/auth.js';
import { withRouter } from 'src/utilities/routing/withRouter.js';

import { getUser, getAccessToken } from 'src/utilities/authentication/auth.js';

class UserDashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        name: '',
        phone: '',
        email: ''
      },
      listings: [],
      rentals: [],
      selectedTab: 'profile'
    };
  }


  componentDidMount() {
    this.populateUserData();
  }

  async populateUserData() {
    const user = getUser();
    const token = getAccessToken();
    if (user !== null && token != null) {
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };

      try {
        const resp = await axios.get(`http://localhost:8000/users/${user.sub}`, config);
        console.log(resp)
        const userData = resp.data;
        const address = userData.address;
       
        let listings = [];
        for (const listing of resp.data.listings) {
          listings.push({
            id: listing.listing_id,
            name: listing.item_name,
            price: listing.item_price,
            category: listing.category
          });
        }

        let rentals = [];
        for (const rental of resp.data.rentals) {
          rentals.push({
            id: rental.listing_id,
            name: rental.item_name,
            price: rental.item_price,
            category: rental.category
          });
        }

        this.setState({
          user: {
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            street1: address.street1,
            street2: address.street2,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country
          },
          listings: listings,
          rentals: rentals,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  redirect(path) {
    this.props.navigate(path);
  }

  setTabKey(key) {
    this.setState({
      selectedTab: key
    })
  }

  render() {
    if (isAuthenticated()) {
      return (
        <div className='layout-container'>
          <h1>User Dashboard</h1>
          <br />
          <Tabs
            activeKey={this.state.selectedTab}
            onSelect={(key) => this.setTabKey(key)}
          >
            <Tab eventKey="profile" title="Profile">
              <br />
              <UserProfile user={this.state.user} mode='edit' />
            </Tab>

            <Tab eventKey="loaning" title="Loaning">
              <br />
              <h1>Loaning</h1>
              
              <ListingRow mode={'valid'} listings={this.state.listings} header="" noListingsMessage='Unable to find listings' />
            </Tab>

            <Tab eventKey="renting" title="Renting">
              <br />
              <h1>Renting</h1>
              <ListingRow mode={'valid'} listings={this.state.rentals} header="" noListingsMessage='Unable to find rentals' />
            </Tab>
          </Tabs>
        </div>
      );
    } else {
      return (
        <Navigate to="/login" />
      );
    }
  }

}

export default withRouter(UserDashboardPage);
