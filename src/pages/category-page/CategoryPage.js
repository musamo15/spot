import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

import { withRouter } from 'src/utilities/routing/withRouter.js';

import './CategoryPage.css';


class CategoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Items: [],
      category: String,
      isLoading: true,
      errors: null
    };
  }

    componentDidMount() {
        this.getCategoryListings();
    }

    getCategoryListings() {

      let categoryName = window.location.href.match(/[A-z]+$/).toString();
      this.setState({category: categoryName});
      console.log(categoryName);
      
      axios.get('http://localhost:8000/getAllListings',{params:  {category: categoryName}})
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
    

  redirect(path) {
    this.props.navigate(path);
  }

  render() {

    let Items = this.state.Items;
    console.log("Test:", this.state.Items);

    return(
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
              <Card.Subtitle className='mb-2 text-muted'>2 miles away</Card.Subtitle>
              <Card.Text>
                <div>
                    ${item.price}/Day
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
                    </div>
                ))}
            </div>
            <br/>
            <h5>Popular Listings</h5>
            <div className='card-pop'>
                {Items.map((item) => (
                    <div key={item.id}>
                        <Card style={{ width: '14rem', cursor: 'pointer' }} onClick={e => this.redirect('listing/' + item.id)}>
            <Card.Img
              variant='top'
              src='https://tesla-view.thron.com/api/xcontents/resources/delivery/getThumbnail/tesla/590x504/44ac2002-409d-42b4-8cdd-6e6cfe635d8d.jpg?v=47&dpr=200'
              alt='Model S'
            />
            <Card.Body>
              <Card.Title><div>{item.name}</div></Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>2 miles away</Card.Subtitle>
              <Card.Text>
                <div>
                    ${item.price}/Day
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
                    </div>
                ))}
            </div>
      </div>
    );
  }
}

export default withRouter(CategoryPage);