import React, { Component } from 'react';

import { setSession } from 'src/utilities/authentication/auth.js';
import { withRouter } from 'src/utilities/routing/withRouter.js';

class AuthPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authorized: false
    }
  }

  componentDidMount() {
    setSession(window.location.hash);
  }

  render() {
    // blank as this page only sets the session to localStorage
    return (
      <div></div>
    );
  }

}

export default withRouter(AuthPage);
