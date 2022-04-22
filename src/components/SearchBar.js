import { React, Component } from 'react'

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import { withRouter } from 'src/utilities/routing/withRouter.js';

class SearchBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            query: '',
            searchButtonDisabled: true
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.redirect = this.redirect.bind(this)
    }

    handleSubmit() {
        this.redirect('/search?query=' +this.state.query)
    }

    handleChange(event) {
        const searchQuery = event.target.value
        const disabled = searchQuery.length <= 0
        
        this.setState({ query: searchQuery, searchButtonDisabled: disabled})
    }

    redirect(path) {
        this.props.navigate(path);
    }

    render() {
        return (
            <InputGroup className="mb-0">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(event) => this.handleChange(event)}
                />
                <Button variant="outline-success" onClick={() => this.handleSubmit()} disabled={this.state.searchButtonDisabled}>
                    Search
                </Button>
            </InputGroup>
        )
    }
}

export default withRouter(SearchBar)
