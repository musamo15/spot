import { React, Component } from 'react'
import  Container  from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

import { withRouter } from 'src/utilities/routing/withRouter.js';

import './ListingRow.css'

class ListingRow extends Component {

    constructor(props) {
        super(props)

        this.redirect = this.redirect.bind(this)
        this.handleRowListings = this.handleRowListings.bind(this)
    }

    redirect(path) {
        this.props.navigate(path);
    }

    handleRowListings() {
        if (this.props.mode === 'loading') {
            const loadingCards = []
            for (let index = 0; index < 24; index++) {
                loadingCards.push(index)
            }

            return (
                loadingCards.map((index) => (
                    <Card key={index} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                            <Placeholder.Button variant="primary" xs={6} />
                        </Card.Body>
                    </Card>
                ))
            )
        }
        else if (this.props.mode === 'valid') {
            return (
                this.props.listings.map((listing) => (
                    <Card key={listing.id}
                        style={{ width: '14rem', cursor: 'pointer' }}
                        onClick={e => this.redirect(`/categories/${listing.category}/listings/${listing.id}`)}>
                        <Card.Img
                            variant='top'
                            src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
                            alt='Model S'
                        />
                        <Card.Body>
                            <Card.Title>{listing.name}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>2 miles away</Card.Subtitle>
                            <Card.Text>${listing.price}/day</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )
        }
        else {
            return (
                <h4>Unable to find listings</h4>
            )
        }
    }

    render() {
        return (
            <Container >
                <div className="col-md-auto mx-auto">
                    <h1>{this.props.header}</h1>
                </div>

                <div className='card-row'>
                    {this.handleRowListings()}
                </div>
            </Container>
        )
    }
}
export default withRouter(ListingRow)