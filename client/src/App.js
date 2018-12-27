import React, { Component } from "react";
import HomePage from "./components/HomePage/HomePage";
import axios from "axios";
import Presentations from "./containers/Presentations/Presentations";
import PresentationForms from "./components/PresentationForms/PresentationForms";
import Navigation from "./components/Navigation/Navigation";
import PresentationDetail from "./containers/PresentationDetail/PresentationDetail";
import { Route, Switch, Redirect } from "react-router-dom";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";

const styles = theme => ({
  root: {
    textAlign: "center",
    backgroundColor : theme.palette.third.dark
  },
  wrapper : {
    padding: theme.spacing.unit * 10,
    backgroundColor : theme.palette.third.dark
  }
});

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
    } catch (err) {
      console.log(err);
    }
  };

  deletePresentation = async (selectedPresentation, id) => {
    try {
      const response = await axios.delete(
        `/presentations/${id}`,
        selectedPresentation
      );
      const deletedPresentation = response.data;
      const presentations = this.state.presentations.filter(presentation => {
        return presentation._id !== deletedPresentation._id;
      });
      this.setState({
        presentations
      });
    } catch (err) {
      this.setState({
        error: err.response.data.message
          ? err.response.data.message
          : err.response.data
      });
    }
  };

  giveDataWithFormattedDate = match => {
    const singlePresentation = this.state.presentations.find(presentation => {
      return presentation._id === match.params.presentationId;
    });

    //Check the existence of singlePresentation to prevent app crush with date of undefined
    if (singlePresentation) {
      singlePresentation.date = moment(singlePresentation.date).format(
        "YYYY-MM-DD"
      );
      return singlePresentation;
    }
  };

  render() {
    const editWithId = ({ match, history }) => {
      return (
        <PresentationForms
          formType="editForm"
          singlePresentation={this.giveDataWithFormattedDate(match)}
          match={match}
          history={history}
          editPresentation={this.editPresentation}
        />
      );
    };

    const detailWithId = ({ match, history }) => {
      return (
        <PresentationDetail
          singlePresentation={this.giveDataWithFormattedDate(match)}
          match={match}
          history={history}
          isLoading={this.state.isLoading}
          error={this.state.error}
          deletePresentation={this.deletePresentation}
        />
      );
    };

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.wrapper}>
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
                  deletePresentation={this.deletePresentation}
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
              component={detailWithId}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App));
