import React, { Component } from 'react';
import axios from 'axios';
import {
  FormControl,
  Typography,
  Grid,
  Paper,
  Button,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import TextInputField from '../../components/UI/TextInputField/TextInputField';
import validateSignInForm from '../../Validation/validateSignInForm';
import { withStyles } from '@material-ui/core/styles';
import auth from '../../authentication/auth';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  signIn__wrapper: {
    margin: theme.spacing.unit * 3,
  },
  signIn__form_container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  signIn__form_title: {
    backgroundColor: theme.palette.primary.darker,
    borderRadius: 4,
    padding: theme.spacing.unit * 2,
  },
  signIn__form_hintMessages: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    borderRadius: 4,
  },
  signIn_form_button: {
    margin: theme.spacing.unit * 3,
  },
  snackbar: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    top: '400px',
  },
});

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    redirectToReferrer: false,
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleBlur = e => {
    this.setState({
      touched: { ...this.state.touched, [e.target.name]: true },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };

    axios
      .post('/api/users/signIn', data)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        this.setState({
          errors: {},
        });
        if (localStorage.getItem('jwtToken')) {
          auth.authenticate(() => {
            this.setState({
              redirectToReferrer: true,
            });
          });
        }
      })
      .catch(err => {
        console.log('error from server', err.response);
        this.setState({
          errors: err.response.data,
        });
      });
  };

  validateInputs = () => {
    const { email, password } = this.state;

    const inputs = { email, password };
    const validationMessage = validateSignInForm(inputs, this.state.touched);
    return validationMessage;
  };

  ableSubmitButton = () => {
    const feedbackMessages = this.validateInputs();
    const { email, password } = this.state;
    const inputs = { email, password };

    //check whether feedbackMessage is empty("") or input values exist to able/disable submit button
    if (
      feedbackMessages.isValid &&
      Object.values(inputs).every(input => input !== '')
    ) {
      return false; //disable false
    }
    return true; //disable true
  };

  render() {
    const { errors, redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { classes } = this.props;
    const feedbackMessages = this.validateInputs();
    const activateButton = this.ableSubmitButton();

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }
    console.log('auth.isAuthenticated', auth.isAuthenticated);
    return (
      <Grid container justify='center'>
        {auth.isAuthenticated === false ? (
          <Snackbar>
            <SnackbarContent
              aria-describedby='client-snackbar'
              message={
                <span id='message-id'>Please Login to see presentations</span>
              }
              className={classes.snackbar}
            />
          </Snackbar>
        ) : null}
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Paper classname={classes.signIn__wrapper}>
            <div className={classes.signIn__form_title}>
              <Typography variant='h5' color='textSecondary' gutterBottom>
                Sign In
              </Typography>
            </div>
            <div>
              <Typography
                variant='overline'
                color='textPrimary'
                gutterBottom
                className={
                  errors.email || errors.password
                    ? classes.signIn__form_hintMessages
                    : ''
                }
              >
                {errors ? errors.email || errors.password : null}
              </Typography>
            </div>
            <FormControl className={classes.signIn__form_container}>
              <TextInputField
                required
                name='email'
                type='email'
                placeholder='Email*'
                value={this.state.email}
                onChange={this.handleChange}
                info='Use an email connected with a gravatar image.'
                feedbackMessages={feedbackMessages.hints.email}
                onBlur={this.handleBlur}
              />
              <TextInputField
                required
                name='password'
                type='password'
                placeholder='Password*'
                value={this.state.password}
                onChange={this.handleChange}
                feedbackMessages={feedbackMessages.hints.password}
                onBlur={this.handleBlur}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.signIn_form_button}
                disabled={activateButton}
                onClick={this.handleSubmit}
              >
                Log In
              </Button>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

SignIn.propTypes = {};

export default withStyles(styles)(SignIn);
