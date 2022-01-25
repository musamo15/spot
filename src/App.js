import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorPage from 'src/pages/error-page/ErrorPage';
import LoginPage from 'src/pages/login-page/LoginPage';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    );
  }

}
