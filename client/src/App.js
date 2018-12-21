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
    this.setState({ isLoading: true }, async () => {
      try {
        const response = await axios.get("/presentations");
        const allPresentations = response.data;
        const presentations = allPresentations;
        this.setState({
          isLoading: false,
          presentations: presentations
        });
      } catch (err) {
        this.setState({
          error: err.response.data.message
            ? err.response.data.message
            : err.response.data
        });
      }
    });
  };

  postNewPresentation = async newPresentation => {
    try {
      const response = await axios.post("/presentations", newPresentation);
      const addedPresentation = response.data;
      const presentations = [...this.state.presentations, addedPresentation];

      this.setState({
        presentations
      });
    } catch (err) {
      console.log(err);
    }
  };

  editPresentation = async (selectedPresentation, id) => {
    try {
      const response = await axios.put(
        `/presentations/${id}`,
        selectedPresentation
      );
      const edittedPresentation = response.data;
      const presentations = this.state.presentations.map(presentation => {
        if (presentation._id === id) {
          return edittedPresentation;
        } else {
          return presentation;
        }
      });
      this.setState({
        presentations
      });
    } catch(err){
      console.log(err)
    }
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
