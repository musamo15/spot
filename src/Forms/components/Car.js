import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


export default class Car extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Make: "",
            Model: "",
            Year: "",
            makeError: "",
            modelError: "",
            yearError: "",
            attributes: {}
        };
        this.handleChange.bind(this);
        this.handleState.bind(this);
    }

    render() {
        return(
            <div>
                <Form.Group className="mt-3">
                    <Form.Label>Make</Form.Label>
                    {this.state.makeError ? <div style={{ color: "red" }}>{this.state.makeError}</div> : null}
                    <Form.Control type="text" placeholder="Enter make" name="Make" value={this.state.Make} required  onChange={( event ) => this.handleChange( event )}/>
                </Form.Group >
                    
                <Form.Group className="mt-3">
                    <Form.Label>Model</Form.Label>
                    {this.state.modelError ? <div style={{ color: "red" }}>{this.state.modelError}</div> : null}
                    <Form.Control type="text" placeholder="Enter model" name="Model" value={this.state.Model} required  onChange={( event ) => this.handleChange( event )}/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Year</Form.Label>
                    {this.state.yearError ? <div style={{ color: "red" }}>{this.state.yearError}</div> : null}
                    <Form.Control type="text" placeholder="Enter year" name="Year" value={this.state.Year} required  onChange={( event ) => this.handleChange( event )}/>
                </Form.Group>
            </div>
        );
    }

    validate = () => {
        let makeError = "";
        let modelError = "";
        let yearError = "";
        if(this.state.Make === '') {
            makeError = 'Please enter Make'
        }

        if(this.state.Model === '') {
            modelError = 'Please enter Model'
        }

        if(this.state.Year === '') {
            yearError = 'Please enter Year'
        }

        if(makeError || modelError || yearError) {
            this.setState({ makeError, modelError, yearError});
            return false;
        }

        return true;
    };

    handleChange = (e) => {
        
        this.setState({ [e.target.name]: e.target.value },
            () => {
                this.props.addAttributes(this.handleState());
            });
    };
    

    handleState() {
        const copy = Object.fromEntries( Object.entries(this.state))

        const attr = copy.attributes
        for (const property in attr) {
            copy[property] = attr[property]
        }

        delete copy.attributes

        console.log(copy.Year)

        return copy
    }

}