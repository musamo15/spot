import { webAuth } from 'src/auth0.js';

const database = 'Username-Password-Authentication';

// TODO: HANDLE AUTO RENEWAL OF SESSION ON TOKEN EXPIRATION

export const login = (email, password) => {
  webAuth.login({
    realm: database, // database name
    email: email,
    password: password
  }, function (err, authResult) {
    if (err) {
      return console.log(err);
    }
  }
  );
}

export const signupAndLogin = (props) => {
  webAuth.signup({
    connection: database,
    email: props.email,
    password: props.password,
    name: `${props.user_metadata.first_name} ${props.user_metadata.last_name}`,
    nickname: props.user_metadata.first_name,
    user_metadata: props.user_metadata
  }, function (err) {
    if (err) {
      return console.log(err);
    }

    // automatically login the user after registration
    login(props.email, props.password);
  });
}

export const logout = async () => {
  await webAuth.logout({
    returnTo: 'http://localhost:3000/'
  });

  // remove tokens and expiry time from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('user');
}

export const isAuthenticated = () => {
  // check whether the current time is past the access token's expiry time
  var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
}

export const getUser = () => {
  if (isAuthenticated()) {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export const getAccessToken = () => {
  if(isAuthenticated()) {
    return localStorage.getItem('id_token')
  }
}


export const setSession = (hash) => {
  webAuth.parseHash({ hash: hash }, function (err, authResult) {
    if (err) {
      return console.log(err);
    }

    webAuth.client.userInfo(authResult.accessToken, function (err, user) {
      if (err) {
        return console.log(err);
      }

      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );

      // set tokens and expiry time to localStorage
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      localStorage.setItem('user', JSON.stringify(user));

      // redirect to the home page
      window.location.assign('/')
    });
  });
}
