import React, { Component } from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import axios from "axios";
import Presentations from "./containers/Presentations/Presentations";
import Addpresentation from "./components/AddPresentation/Addpresentation";
import Navigation from "./components/Navigation/Navigation";
import PresentationDetail from "./components/PresentationDetail/PresentationDetail";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    presentations: [],
    singlePresentation : null,
    isLoading: false,
    error: false
  };

  componentDidMount() {
    this.loadpresentations();
  }

  loadpresentations = () => {
    this.setState({ isLoading: true }, () => {
      axios
        .get("/presentations")
        .then(response => {
          this.setState({
            isLoading: false,
            presentations: this.state.presentations.concat(response.data)
          });
        })
        .catch(error => {
          this.setState({
            error: error.response
          });
        });
    });
  };

  render() {

    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={() => <HomePage />} />
          <Route
            exact
            path="/presentations"
            render={props => <Presentations {...props} presentations={this.state.presentations} isLoading={this.state.isLoading} error={this.state.error}/>}
          />
          <Route
           exact
            path="/presentations/addPresentation"
            render={props => <Addpresentation {...props} />}
          />
          <Route
            exact
            path="/presentations/:presentationId"
            render={props => <PresentationDetail
              presentation= {this.state.presentations}
              {...props}
            />}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
