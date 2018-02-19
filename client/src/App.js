import React from "react";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Saved" component={Saved} />
        <Route NoMatch component={NoMatch} />
      </Switch>
    </div>
  </Router>


export default App;
