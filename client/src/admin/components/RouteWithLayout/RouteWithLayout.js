import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import userProvider from 'services/userProvider'

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, requireAuthentication, ...rest } = props;
  const history = useHistory();

  if (requireAuthentication)
    if (!(userProvider.loggedUser?.role == "admin" && userProvider.isAuthenticated())) {
      history.push("/sign-in");
    }

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
