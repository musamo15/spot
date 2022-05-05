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
      mode: params.get('mode'),
      listingId: params.get('listing_id')
    };
  }

  render() {
    return (
      <div className='layout-container'>
        <ListingForm
          category={this.state.category}
          mode={this.state.mode}
          listingId={this.state.listingId}
        />
      </div>
    );
  }

}

export default withRouter(CreateListingPage);
