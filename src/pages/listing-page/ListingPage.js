import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from './../../utilities/routing/withRouter';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button'
import './ListingPage.css';
import Navigation from 'src/components/navigation/Navigation';

class ListingPage extends Component {
    constructor(props) {
        super(props);

        const params = new URLSearchParams(this.props.location.search);

        this.state = {
            host_id: String,
            category: params.get('category'),
            item_name: String,
            item_price: String,
            start_date: String,
            end_date: String,
            attributes: {},
            listing_id: params.get('listing_id'),
            rentals: [],
            locationLONG: String,
            locationLAT: String
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/getListing`, {
            params: {
                listingId: this.state.listing_id,
                category: this.state.category
            }
        })
            .then(response => {
                this.setState(response.data);
            })
    }

    render() {
        return (
            <div className='navbar-container'>
                <Navigation />
                <div className='listing-page-container'>
                    <div className='titles'>{this.state.item_name}</div>
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
                                <Button variant='dark'>Edit</Button>
                            </div>
                            <div>Price</div>
                            {this.state.item_price}
                            <Button variant='dark'>Continue</Button>
                        </div>
                    </div>
                    <div>Listed by {this.state.host_id}</div>
                    <div className='mt-4 titles'>
                        Item Description
                    </div>
                    <div className='item-description'>
                        {Object.entries(this.state.attributes).map(attribute =>
                            <div>
                                <h3>{attribute[0]}</h3>
                                <p>{attribute[1]}</p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        )
    }


}

export default withRouter(ListingPage);