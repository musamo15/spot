import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AuthPage from 'src/pages/auth-page/AuthPage';
import ErrorPage from 'src/pages/error-page/ErrorPage';
import HomePage from 'src/pages/home-page/HomePage';
import LoginPage from 'src/pages/login-page/LoginPage';
import RegistrationPage from 'src/pages/registration-page/RegistrationPage';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter history={history}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/authorize' element={<AuthPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegistrationPage/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    );
  }

}

export const history = createBrowserHistory();
