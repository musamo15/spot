import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorPage from 'src/pages/error-page/ErrorPage';
import HomePage from 'src/pages/home-page/HomePage';
import LoginPage from 'src/pages/login-page/LoginPage';
import RegistrationPage from 'src/pages/registration-page/RegistrationPage';

import Navigation from 'src/components/navigation/Navigation';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegistrationPage/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    );
  }

}
