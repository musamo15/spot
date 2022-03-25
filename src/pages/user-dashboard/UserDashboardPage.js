import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from '../../utilities/routing/withRouter';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Tabs, Tab } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Badge,
  Card,
  Row,
  Col,
} from "react-bootstrap";

class UserDashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            userID: []
        });
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/getUser?userId=622051104a64440011a98bd4')
          .then(response => {
            console.log(response.data)
            this.setState({userID: response.data});
          })
    }
    
    render(){ return(
        <div className="tab-wrapper">
      <div className='container-fluid' >
        <div className="row">
          <div className="col-sm-12">

            <Tabs defaultActiveKey="profile">
              <Tab eventKey="Settings" title="Settings">
                < div className="tab-item-wrapper">
                  <h5>User Dashbord</h5>
                  <p>Settings</p>

                  <ButtonGroup vertical>
                        <Button>Personal Information</Button>
                        <Button>Messages</Button>
                        <Button>Insurance</Button>
                        <Button>Payment</Button>
                </ButtonGroup>

                <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                      
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue="Suslow"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Some address nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="United States"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Ford Mustang"
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  //src={
                    //require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                    //  .default
                  // }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      //src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">Mike Suslow</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Ford Mustang" <br></br>
                  
                  
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      </div> 
              </Tab>

              <Tab eventKey="Loaning" title="Loaning">
                <div className="tab-item-wrapper">
                  <h5>Contact Info</h5>
                  <p>Loaning</p>
                </div>
                </Tab>

                <Tab eventKey="Renting" title="Renting">
                <div className="tab-item-wrapper">
                  <h5>Contact Info</h5>
                  <p>Loaning</p>
                </div>
              </Tab>
              
              <Tab eventKey="Following" title="Following">
                <div className="tab-item-wrapper">
                  <h5>Contact Info</h5>
                  
                </div>
              </Tab>
            </Tabs>

          </div>
        </div>
      </div>
    </div>
  );
       
    } 
}
export default withRouter(UserDashboardPage);
