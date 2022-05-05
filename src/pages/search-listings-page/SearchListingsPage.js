import React, { Component } from 'react'
import { withRouter } from 'src/utilities/routing/withRouter.js'
import axios from 'axios'

import ListingRow from 'src/components/listingRow/ListingRow'

class SearchListingsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listings: {},
            mode: 'loading'
        };

        this.fetchQueryListings = this.fetchQueryListings.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.key !== prevProps.location.key) {
            this.fetchQueryListings()
        }
    }

    componentDidMount() {
        this.fetchQueryListings()
    }

    async fetchQueryListings() {
        const params = new URLSearchParams(this.props.location.search)
        const queryParams = {
            query: params.get('query')
        }
        let mode = 'error'
        let formattedListings = []
        
        try {
            const response = await axios.get('http://localhost:8000/search', { params: queryParams })
    
            if (response.status === 200) {
                
                const listingsData = [...response.data]
               
                if(listingsData.length > 0) {
                    listingsData.map(
                        (listing) => formattedListings.push({
                            id: listing.listing_id,
                            name: listing.item_name,
                            price: listing.item_price,
                            category: listing.category
                        })
                    )
                    mode = 'valid'
                }
            }
        }catch(error) {
            // If an error is hit during the api call show error message
        }

        this.setState({ listings: formattedListings, mode: mode })
    }

    render() {
        return (
            <ListingRow mode={this.state.mode} listings={this.state.listings} header="Listings Found" noListingsMessage='Unable to find listings'/>
        )
    }
}

export default withRouter(SearchListingsPage)