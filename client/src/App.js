import React, { Component } from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Presentations from "./containers/Presentations/Presentations";
import Addpresentation from "./components/AddPresentation/Addpresentation";
import Navigation from "./components/Navigation/Navigation";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={() => <HomePage />} />
          <Route
            exact
            path="/presentations"
            render={props => <Presentations {...props} />}
          />
          <Route
            path="/presentations/addPresentation"
            render={props => <Addpresentation {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
