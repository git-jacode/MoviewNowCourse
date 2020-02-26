import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import ListEpisode from './pages/ListEpisode';
import Watch from './pages/Watch';

import { istAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      istAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signIn" exact component={SignIn} />

      <PrivateRoute path="/main" component={Main} />
      <PrivateRoute path="/episodes" component={ListEpisode} />
      <PrivateRoute path="/watch" component={Watch} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
