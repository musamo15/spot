import React, { Component } from 'react';

import ListingForm from 'src/forms/ListingForm.js';

import { withRouter } from 'src/utilities/routing/withRouter.js';

import './CreateListingPage.css';

class CreateListingPage extends Component {

  constructor(props) {
    super(props);
    const params = new URLSearchParams(this.props.location.search);
    this.state = {
      category: params.get('category'),
      mode: params.get('mode')
    };
  }

  render() {
    return (
      <ListingForm
        category={this.state.category}
        mode={this.state.mode}
      />
    );
  }

}

export default withRouter(CreateListingPage);
