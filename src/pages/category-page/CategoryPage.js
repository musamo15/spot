import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Navigation from 'src/components/navigation/Navigation';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { withRouter } from 'src/utilities/routing/withRouter.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './CategoryPage.css';


class CategoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Items: [],
      category: String,
      categoryName: window.location.href.match(/[A-z]+$/).toString(),
      zipCode: "08094",
      isLoading: true,
      errors: null
    };
  }

    componentDidMount() {
        this.getCategoryListings();
        this.sortCategoryLocation();
        this.sortCategoryPrice();
    }

    updateZip(e) {
      this.setState({
        zipCode: e.target.value
      });
    }

    getCategoryListings() {
      this.setState({category: this.state.categoryName});
      console.log(this.state.categoryName);
      
      axios.get('http://localhost:8000/getAllListings',{params:  {category: this.state.categoryName}})
            .then((response) => {
                console.log(response);
            return [...response.data].map((item) => ({
                    id: item.listing_id,
                    name: item.item_name,
                    price: item.item_price,
                    category: item.category,
                    distance: 0,
                    hostId: item.host_id
                }));
            })
            .then((Items) => {
                console.log(Items);
                this.setState({
                    Items,
                    isLoading: false
                });
            })
            .catch((errors) => this.setState({ errors, isLoading: false }));

    }
    
    getListingsFiltered() {
      this.setState({category: this.state.categoryName});
      console.log(this.state.categoryName);
      const filters = {}
      
      axios.put('http://localhost:8000/getAllListingsFiltered?category=Test', filters)
            .then((response) => {
                console.log(response);
            return [...response.data].map((item) => ({
                    id: item.listing_id,
                    name: item.item_name,
                    price: item.item_price,
                    category: item.category
                }));
            })
            .then((Items) => {
                console.log(Items);
                this.setState({
                    Items,
                    isLoading: false
                });
            })
            .catch((errors) => this.setState({ errors, isLoading: false }));
    }

    sortCategoryLocation() {
      this.setState({category: this.state.categoryName});
      axios.get('http://localhost:8000/sort_by_location',{
        params:
        { category: this.state.categoryName,
          zip: this.state.zipCode
        }
      })
            .then((response) => {
                console.log(response);
            return [...response.data].map((item) => ({
                    id: item.listing_id,
                    name: item.item_name,
                    price: item.item_price,
                    category: item.category,
                    distance: item.distance,
                    hostId: item.host_id
                }));
            })
            .then((Items) => {
                console.log(Items);
                this.setState({
                    Items,
                    isLoading: false
                });
            })
            .catch((errors) => this.setState({ errors, isLoading: false }));
    }

    sortCategoryPrice(sortOn) {
      const sortParams = {
        category: this.state.categoryName,
        zip: this.state.zipCode,
        sortedOn: sortOn
      }

      const filters = {}

      axios.put('http://localhost:8000/getAllListingsSorted',
      filters, {params: sortParams })
            .then((response) => {
                console.log(response.data);
            return [...response.data].map((item) => ({
                    id: item.listing_id,
                    name: item.item_name,
                    price: item.item_price,
                    category: item.category,
                    distance: item.distance,
                    hostId: item.host_id
                }));
            })
            .then((Items) => {
                console.log(Items);
                this.setState({
                    Items,
                    isLoading: false
                });
            })
            .catch((errors) => this.setState({ errors, isLoading: false }));
    }

  redirect(path) {
    this.props.navigate(path);
  }

  render() {

    let Items = this.state.Items;
    console.log("Test:", this.state.Items);

    return(
      <div className='navbar-container'>
        <Navigation />
        <NavDropdown title='Sort & Filter' id='collasible-nav-dropdown-sorting'>
            <p>Sort By:</p>
            <NavDropdown.Item onClick={e => this.sortCategoryPrice("priceLowToHigh")}>Price: Lowest to Highest</NavDropdown.Item>
            <NavDropdown.Item onClick={e => this.sortCategoryPrice("priceHighToLow")}>Price: Highest to Lowest</NavDropdown.Item>
            <Form.Group className='mb-3'>
            <Form.Label>Location</Form.Label>
            <Form.Control type='text'
              placeholder={this.state.zipCode}
              onChange={e => this.updateZip(e)} />
          </Form.Group>
            <Button 
            variant='success'
            disabled={(isNaN(this.state.zipCode)) || (this.state.zipCode.length !== 5)}
              onClick={e => this.sortCategoryLocation()}>Submit 5 Digit Zip Code</Button>
            <p></p>
            <p>Filter By:</p>
            <NavDropdown.Item href='#'>Location</NavDropdown.Item>
            <NavDropdown.Item href='#'>Price</NavDropdown.Item>
          </NavDropdown>
        <div className='category-page-container'>
          <h5>All Listings</h5>
          <div className='card-row'>
            {Items.map((item) => (
              <div key={item.id}>
                <Card style={{ width: '14rem', cursor: 'pointer' }} onClick={e => this.redirect('/listing?listing_id=' + item.id + '&category=' + item.category)}>
                  <Card.Img
                    variant='top'
                    src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
                    alt='Model S'
                  />
                  <Card.Body>
                    <Card.Title><div>{item.name}</div></Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>Listed by {item.hostId}</Card.Subtitle>
                    <Card.Text>
                      <div>
                        ${item.price}/Day
                      </div>
                      <div>
                        {item.distance} miles away
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          <br />
          <h5>Popular Listings</h5>
          <div className='card-pop'>
            {Items.map((item) => (
              <div key={item.id}>
                <Card style={{ width: '14rem', cursor: 'pointer' }} onClick={e => this.redirect('/listing?listing_id=' + item.id + '&category=' + item.category)}>
                  <Card.Img
                    variant='top'
                    src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
                    alt='Model S'
                  />
                  <Card.Body>
                    <Card.Title><div>{item.name}</div></Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>Listed by {item.hostId}</Card.Subtitle>
                    <Card.Text>
                      <div>
                        ${item.price}/Day
                      </div>
                      <div>
                        {item.distance} miles away
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CategoryPage);