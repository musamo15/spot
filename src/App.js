import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AuthPage from 'src/pages/auth-page/AuthPage';
import ErrorPage from 'src/pages/error-page/ErrorPage';
import HomePage from 'src/pages/home-page/HomePage';
import LoginPage from 'src/pages/login-page/LoginPage';
import RegistrationPage from 'src/pages/registration-page/RegistrationPage';
import ListingPage from 'src/pages/listing-page/ListingPage';
import CreateListingPage from 'src/pages/create-listing-page/CreateListingPage'
import CategoryPage from 'src/pages/category-page/CategoryPage';
import UserDashboardPage from 'src/pages/user-dashboard/UserDashboardPage';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter history={history}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/authorize' element={<AuthPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegistrationPage/>}/>
          <Route path='/listing' element={<ListingPage/>}/>
          <Route path='/create-listing' element={<CreateListingPage/>}/>
          <Route path='*' element={<ErrorPage/>}/>
          <Route path='/category' element={<CategoryPage/>}/>
          <Route path='/category/Car' element={<CategoryPage/>}/>
          <Route path='/category/Test' element={<CategoryPage/>}/>
          <Route path='/profile' element={<UserDashboardPage/>}/> 
        </Routes>
      </BrowserRouter>
    );
  }

}

export const history = createBrowserHistory();
