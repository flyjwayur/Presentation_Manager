import React, { Component } from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import axios from "axios";
import Presentations from "./containers/Presentations/Presentations";
import PresentationForms from "./components/PresentationForms/PresentationForms";
import Navigation from "./components/Navigation/Navigation";
import PresentationDetail from "./containers/PresentationDetail/PresentationDetail";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    presentations: [],
    isLoading: false,
    error: false
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
            presentations: response.data
          });
        })
        .catch(error => {
          this.setState({
            error: error.response.data.message
              ? error.response.data.message
              : error.response.data
          });
        });
    });
  };

  postNewPresentation = newPresentation => {
    axios
      .post("/presentations", newPresentation)
      .then(response => {
        const presentations = [...this.state.presentations, response.data];
        this.setState({
          presentations
        });
      })
      .catch(err => console.log(err));
  };

  editPresentation = (selectedPresentation, id) => {
    axios
    .put(`/presentations/${id}`, selectedPresentation)
    .then(response => {
      this.setState({
        presentations: this.state.presentations.map(presentation => {
          if (presentation._id === id) {
            return response.data;
          } else {
            return presentation;
          }
        })
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    const editWithId = ({ match, history }) => {
      return (
        <PresentationForms
          formType="editForm"
          singlePresentation={this.state.presentations.find(presentation => {
            return presentation._id === match.params.presentationId;
          })}
          history={history}
          editPresentation={this.editPresentation}
        />
      );
    };

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
                loadPresentations={this.loadPresentations}
                presentations={this.state.presentations}
                isLoading={this.state.isLoading}
                error={this.state.error}
              />
            )}
          />
          <Route
            exact
            path="/presentations/addPresentation"
            render={props => (
              <PresentationForms
                formType="addForm"
                {...props}
                postNewPresentation={this.postNewPresentation}
              />
            )}
          />
          <Route
            exact
            path="/presentations/:presentationId/edit"
            component={editWithId}
          />
          <Route
            exact
            path="/presentations/:presentationId"
            render={props => (
              <PresentationDetail
                {...props}
                presentations={this.state.presentations}
                isLoading={this.state.isLoading}
                error={this.state.error}
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
