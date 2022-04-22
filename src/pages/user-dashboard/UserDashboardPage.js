import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import UserProfile from 'src/forms/users/UserProfile';

import { isAuthenticated } from 'src/utilities/authentication/auth.js';
import { withRouter } from 'src/utilities/routing/withRouter.js';

class UserDashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'profile'
    };
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
          <br/>
          <Tabs
            activeKey={this.state.selectedTab}
            onSelect={(key) => this.setTabKey(key)}
          >
            <Tab eventKey="profile" title="Profile">
              <br/>
              <UserProfile mode='edit' />
            </Tab>

            <Tab eventKey="loaning" title="Loaning">
              <br/>
              <h1>Loaning</h1>
            </Tab>

            <Tab eventKey="renting" title="Renting">
              <br/>
              <h1>Renting</h1>
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
