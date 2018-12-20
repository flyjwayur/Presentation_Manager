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
    error: false,
    errorMessage: ""
  };

  componentDidMount() {
    this.loadPresentations();
  }

  loadPresentations = () => {
    this.setState({ isLoading: true }, () => {
      axios
        .get("/presentations")
        .then(response => {
          console.log("get all :", response.data);
          this.setState({
            isLoading: false,
            presentations: response.data
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

  // Before finding the way to get updated data from db 
  // updateSinglePresentation = singlePresentation => {
  //   this.setState({
  //     presentations: this.state.presentations.map(existingPresentation => {
  //       if (existingPresentation._id === singlePresentation._id) {
  //         return singlePresentation;
  //       } else {
  //         return existingPresentation;
  //       }
  //     })
  //   });
  // };

  render() {
    const editWithId = ({ match, history }) => {
      return (
        <PresentationForms
          formType="editForm"
          singlePresentation={this.state.presentations.find(presentation => {
            console.log("presentation._id", presentation._id);
            console.log("id from params", match.params.presentationId);
            return presentation._id === match.params.presentationId;
          })}
          history={history}
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
                errorMessage={this.state.errorMessage}
              />
            )}
          />
          <Route
            exact
            path="/presentations/addPresentation"
            render={props => (
              <PresentationForms formType="addForm" {...props} />
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
            render={props => <PresentationDetail {...props} updateSinglePresentation={this.updateSinglePresentation}/>}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
