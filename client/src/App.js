import React, { Component } from "react";
import HomePage from "./components/HomePage/HomePage";
import Presentations from "./components/Presentations/Presentations";
import PresentationForms from "./containers/PresentationForms/PresentationForms";
import Navigation from "./components/Navigation/Navigation";
import PresentationDetail from "./components/PresentationDetail/PresentationDetail";
import SignUp from "./containers/Auth/SignUp";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchFromDB } from "./store/actions/fetchFromDBAction";
import { addPresentation } from "./store/actions/addPresentationAction";
import { editPresentation } from "./store/actions/editPresentationAction";
import { deletePresentation } from "./store/actions/deletePresentationAction";

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

  componentDidMount() {
    this.props.onFetchDataFromDB();
  }

  giveDataWithFormattedDate = match => {
    const singlePresentation = this.props.presentations.find(presentation => {
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

    // classes for material UI
    const { classes, presentations, error, isLoading, onAddPresentation, onEditPresentation, onDeletePresentation, validationErrorMessage,validFromServer } = this.props;

    const editWithId = ({ match, history }) => {
      return (
        <PresentationForms
          formType="editForm"
          singlePresentation={this.giveDataWithFormattedDate(match)}
          match={match}
          history={history}
          editPresentation={onEditPresentation}
        />
      );
    };

    const detailWithId = ({ match, history }) => {
      return (
        <PresentationDetail
          singlePresentation={this.giveDataWithFormattedDate(match)}
          match={match}
          history={history}
          isLoading={isLoading}
          error={error}
          deletePresentation={onDeletePresentation}
        />
      );
    };

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
                  presentations={presentations}
                  isLoading={isLoading}
                  error={error}
                  deletePresentation={onDeletePresentation}
                  onAddPresentation={onAddPresentation}
                  validFromServer={validFromServer}
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
                  onAddPresentation={onAddPresentation}
                  validationErrorMessage={validationErrorMessage}
                  validFromServer={validFromServer}
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
            <Route 
            exact
            path="/signUp"
            component={SignUp} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    presentations: state.presentations,
    error : state.error,
    isLoading : state.isLoading,
    validationErrorMessage : state.validationErrorMessage,
    validFromServer : state.validFromServer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchDataFromDB: () => dispatch(fetchFromDB()),
    onAddPresentation : newPresentation => dispatch(addPresentation(newPresentation)),
    onEditPresentation : (selectedPresentation, id) => dispatch(editPresentation(selectedPresentation, id)),
    onDeletePresentation : (selectedPresentation, id) => dispatch(deletePresentation(selectedPresentation, id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));
