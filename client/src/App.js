import React from 'react';
import './App.css';
import routes from "./routes";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Routes from 'admin/Routes';
import { ThemeProvider } from '@material-ui/core';
import theme from 'admin/theme';
import Home from 'client/home/Home';
import MyCourses from 'client/myCourses/MyCourses';

const RenderRoute = (route) => {

  document.title = route.title || "online-courses";
  // console.log(route.needsAuth && !userProvider.isAuthenticated());
  // if (route.needsAuth && !userProvider.isAuthenticated()) {
  //   history.push("/sign-in");
  // }
  return (
    <Route
      path={route.path}
      exact
      render={(props) => <route.component {...props} />}
    ></Route>
  );
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Route
            path='/'
            exact
            component={Home}
          />
          <Route
            path='/myCourses'
            exact
            component={MyCourses}
          />
          <Routes />
        </Router>
      </ThemeProvider>

    </div >
  );
}

export default App;
