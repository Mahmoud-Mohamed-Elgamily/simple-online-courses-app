import React from 'react';
import './App.css';
import routes from "./routes";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import AdminHome from "admin/AdminHome";

const RenderRoute = (route) => {
  const history = useHistory();

  document.title = route.title || "online-courses";
  if (route.needsAuth && !!localStorage.token) {
    history.push("/login");
  }
  return (
    <Route
      path={route.path}
      exact
      render={(props) => <route.component {...props} />}
    ></Route>
  );
  // debugger
};

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RenderRoute {...route} key={index} />
          ))}
        </Switch>
      </Router>
      <AdminHome />
    </div >
  );
}

export default App;
