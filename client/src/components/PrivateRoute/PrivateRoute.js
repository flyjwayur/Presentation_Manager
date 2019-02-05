import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../authentication/auth';

const PrivateRoute = ({ component: Component, componentRender, ...rest }) => {
  return auth.isAuthenticated === true ? (
    <Route {...rest} render={componentRender} />
  ) : (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{
            pathname: '/signIn',
            state: { from: props.location },
          }}
        />
      )}
    />
  );
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
