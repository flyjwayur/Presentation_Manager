import React, { Component } from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import axios from "axios";
import Presentations from "./containers/Presentations/Presentations";
import AddPresentation from "./components/AddPresentation/AddPresentation";
import Navigation from "./components/Navigation/Navigation";
import PresentationDetail from "./containers/PresentationDetail/PresentationDetail";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    presentations: [],
    singlePresentation: null,
    isLoading: false,
    error: false,
    errorMessage: "",
    formInputs: {
      presenter: "",
      evaluator: "",
      topic: "",
      article: "",
      date: "",
      keywords: "",
      summary: ""
    }
  };

  componentDidMount() {
    this.loadPresentations();
  }

  loadPresentations = () => {
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
            error: true,
            errorMessage: error.response.data.message
              ? error.response.data.message
              : error.response.data
          });
        });
    });
  };

  handleInputsChange = e => {
    this.setState({
      formInputs : {...this.state.formInputs, [e.target.name]: e.target.value}
    });
  };

  handleInputsSubmit = e => {
    e.preventDefault();

    axios
      .post("/presentations", this.state.formInputs)
      .then(response => {
        console.log(response);
        this.setState({
          presentations : this.state.presentations.concat(this.state.formInputs)
        })
      })
      .catch(err => console.log(err));
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
            render={props => (
              <Presentations
                {...props}
                presentations={this.state.presentations}
                isLoading={this.state.isLoading}
                error={this.state.error}
                errorMessage={this.state.errorMessage}
              />
            )}
          />
          <Route
            exact
            path="/presentations/addPresentation"
            render={props => (
              <AddPresentation
                {...props}
                handleInputsChange={this.handleInputsChange}
                handleInputsSubmit={this.handleInputsSubmit}
                formInputs={this.state.formInputs}
              />
            )}
          />
          <Route
            exact
            path="/presentations/:presentationId"
            render={props => (
              <PresentationDetail
                presentation={this.state.presentations}
                {...props}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
