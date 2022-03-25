import React, { Component } from 'react';
import { withRouter } from 'src/utilities/routing/withRouter.js';
import './CreateListingsPage.css';
import ListingForm from 'src/Forms/ListingForm.js';
import Navigation from 'src/components/navigation/Navigation';

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
            <div className='navbar-container'>
                <Navigation />
                <ListingForm category={this.state.category} mode={this.state.mode} />
            </div>
        );
    }
}

export default withRouter(CreateListingPage)