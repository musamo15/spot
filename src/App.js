import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AuthPage from 'src/pages/auth-page/AuthPage';
import CategoryPage from 'src/pages/category-page/CategoryPage';
import CreateListingPage from 'src/pages/create-listing-page/CreateListingPage';
import ErrorPage from 'src/pages/error-page/ErrorPage';
import HomePage from 'src/pages/home-page/HomePage';
import ListingPage from 'src/pages/listing-page/ListingPage';
import LoginPage from 'src/pages/login-page/LoginPage';
import NavWrapper from 'src/components/navigation/NavWrapper';
import RegistrationPage from 'src/pages/registration-page/RegistrationPage';
import UserDashboardPage from 'src/pages/user-dashboard/UserDashboardPage';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter history={history}>
        <Routes>
          <Route path='/' element={<NavWrapper component=<HomePage/> />} />
          <Route path='authorize' element={<AuthPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegistrationPage />} />
          <Route path='profile' element={<NavWrapper component=<UserDashboardPage/> />} />
          <Route path='categories/:category_id' element={<NavWrapper component=<CategoryPage/> />} />
          <Route path='categories/:category_id/listings/:listing_id' element={<NavWrapper component=<ListingPage/> />} />
          <Route path='create-listing' element={<NavWrapper component=<CreateListingPage/> />} />
          <Route path='*' element={<NavWrapper component=<ErrorPage/> />} />
        </Routes>
      </BrowserRouter>
    );
  }

}

export const history = createBrowserHistory();
