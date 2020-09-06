import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  CourseList as CourseListView,
  UserList as UserListView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  CategoriesList as CategoriesListView
} from './views';

const Routes = () => {
  return (
    <Switch>
      {/* <Redirect
        exact
        from="/"
        to="/dashboard"
      /> */}
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        requireAuthentication={true}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={CategoriesListView}
        exact
        layout={MainLayout}
        path="/categories"
      />
      <RouteWithLayout
        component={CourseListView}
        exact
        layout={MainLayout}
        path="/courses"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      {/* <Redirect to="/not-found" /> */}
    </Switch>
  );
};

export default Routes;
