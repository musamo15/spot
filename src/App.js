import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';

import ErrorPage from 'src/pages/error-page/ErrorPage';
import HomePage from 'src/pages/home-page/HomePage';
import LoginPage from 'src/pages/login-page/LoginPage';
import Navigation from 'src/components/navigation/Navigation';
import RegistrationPage from 'src/pages/registration-page/RegistrationPage';

const onRedirectCallback = (appState) => {
  // use the router's history module to replace the url
  history.replace(appState?.returnTo || window.location.pathname);
};

export default class App extends Component {

  render() {
    return (
      <Auth0Provider
        domain="dev-qp3m-vkb.us.auth0.com"
        clientId="DptvH9vjXiNIY2Z0KfCCp7xNmWX7dW7E"
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        cacheLocation='localstorage'
      >
        <BrowserRouter history={history}>
          <Navigation/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={withAuthenticationRequired(<LoginPage/>)}/>
            <Route path='/register' element={<RegistrationPage/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    );
  }

}

export const history = createBrowserHistory();
