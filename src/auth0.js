import auth0 from 'auth0-js';

// initialize & export the auth0 API client
export const webAuth = new auth0.WebAuth({
  domain: 'dev-qp3m-vkb.us.auth0.com',
  clientID: 'DptvH9vjXiNIY2Z0KfCCp7xNmWX7dW7E',
  redirectUri: 'http://localhost:3000/authorize',
  scope: 'openid profile email', // needed to run locally
  responseType: 'id_token token'
});
