import React, { Component } from 'react';
import HomePage from './components/HomePage/HomePage';
import Presentations from './components/Presentations/Presentations';
import PresentationForms from './containers/PresentationForms/PresentationForms';
import Navigation from './components/Navigation/Navigation';
import PresentationDetail from './components/PresentationDetail/PresentationDetail';
import SignUp from './containers/Auth/SignUp';
import SignIn from './containers/Auth/SignIn';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchFromDB } from './store/actions/fetchFromDBAction';
import { addPresentation } from './store/actions/addPresentationAction';
import { editPresentation } from './store/actions/editPresentationAction';
import { deletePresentation } from './store/actions/deletePresentationAction';
import jwt_decode from 'jwt-decode';
import setAuthToken from './authentication/setAuthToken';
import auth from './authentication/auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const styles = theme => ({
  root: {
    textAlign: 'center',
    backgroundColor: theme.palette.third.dark,
    height: '100vh',
  },
  wrapper: {
    paddingTop: theme.spacing.unit * 10,
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    backgroundColor: theme.palette.third.dark,
  },
});

class App extends Component {
  componentDidMount() {
    this.props.onFetchDataFromDB();
    if (localStorage.getItem('jwtToken')) {
      setAuthToken(localStorage.getItem('jwtToken'));
      auth.isAuthenticated = true;
      auth.user = jwt_decode(localStorage.getItem('jwtToken'));
      console.log('inside jwtToken in localStorage');
    }
  }

  giveDataWithFormattedDate = match => {
    const singlePresentation = this.props.presentations.find(presentation => {
      return presentation._id === match.params.presentationId;
    });

    //Check the existence of singlePresentation to prevent app crush with date of undefined
    if (singlePresentation) {
      singlePresentation.date = moment(singlePresentation.date).format(
        'YYYY-MM-DD',
      );

      return singlePresentation;
    }
  };

  render() {
    // classes for material UI
    const {
      classes,
      presentations,
      error,
      isLoading,
      onAddPresentation,
      onEditPresentation,
      onDeletePresentation,
      validationErrorMessage,
    } = this.props;

    const editWithId = ({ match, history }) => {
      return (
        <PresentationForms
          formType='editForm'
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
            <Route exact path='/' component={() => <HomePage />} />
            <PrivateRoute
              exact
              path='/presentations'
              componentRender={props => (
                <Presentations
                  {...props}
                  presentations={presentations}
                  isLoading={isLoading}
                  error={error}
                  deletePresentation={onDeletePresentation}
                />
              )}
            />
            <PrivateRoute
              exact
              path='/presentations/addPresentation'
              componentRender={props => (
                <PresentationForms
                  formType='addForm'
                  {...props}
                  onAddPresentation={onAddPresentation}
                  validationErrorMessage={validationErrorMessage}
                />
              )}
            />
            <PrivateRoute
              exact
              path='/presentations/:presentationId/edit'
              componentRender={editWithId}
            />
            <PrivateRoute
              exact
              path='/presentations/:presentationId'
              componentRender={detailWithId}
            />
            <Route exact path='/signUp' component={SignUp} />
            <Route exact path='/signIn' component={SignIn} />
            <Redirect to='/' />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    presentations: state.presentations,
    error: state.error,
    isLoading: state.isLoading,
    validationErrorMessage: state.validationErrorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchDataFromDB: () => dispatch(fetchFromDB()),
    onAddPresentation: newPresentation =>
      dispatch(addPresentation(newPresentation)),
    onEditPresentation: (selectedPresentation, id) =>
      dispatch(editPresentation(selectedPresentation, id)),
    onDeletePresentation: (selectedPresentation, id) =>
      dispatch(deletePresentation(selectedPresentation, id)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles)(App)),
);
