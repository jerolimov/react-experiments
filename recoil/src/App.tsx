import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Header from "./header/Header";

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route>
            <h1>404 - Route not found</h1>
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  );
}
