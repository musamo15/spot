import React, { Component } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';

import { isAuthenticated, getAccessToken } from 'src/utilities/authentication/auth.js';

export default class FileUpload extends Component {

  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.files !== this.state.files) {
      this.uploadFiles();
    }
  }

  async uploadFiles() {
    let formData = new FormData();
    this.state.files.forEach(file => {
      // append each file to the multipart/form-data
      formData.append('files', file, file.name);
    });

    const token = getAccessToken();
    if (token != null) {
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };

      try {
        // upload the files (API will handle unique naming of files)
        // TODO: THIS COMPONENT ONLY HANDLES IMAGES RIGHT NOW
        const resp = await axios.post('http://localhost:8000/images', formData, config);

        if (this.props.onUpload) {
          // return the file URL's up to the parent object
          this.props.onUpload(resp.data.urls);
        }
      } catch(err) {
        console.log(err);
      }
    }
  }

  updateFiles(e) {
    this.setState({
      files: [...e.target.files]
    });
  }

  render() {
    return (
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>{this.props.label}</Form.Label>
        <input className='form-control'
          type="file"
          required={this.props.required}
          multiple={this.props.multiple}
          accept={this.props.accept}
          onChange={e => this.updateFiles(e)}
          disabled={!isAuthenticated() || this.props.disabled}
        />
      </Form.Group>
    );
  }

}
