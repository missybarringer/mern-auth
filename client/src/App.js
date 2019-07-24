import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

//check for token to keep user logged in
if (localStorage.jwtToken) {
  //set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //decode token and get user info & exp
  const decoded = jwt_decode(token);
  //set user & isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    //redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
