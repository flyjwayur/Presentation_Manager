import React, { Component } from 'react';
import axios from 'axios';
import {
  FormControl,
  Typography,
  Grid,
  Paper,
  Button,
} from '@material-ui/core';
import TextInputField from '../../components/UI/TextInputField/TextInputField';
import validateSignInForm from '../../Validation/validateSignInForm';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexGrow: 1,
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
});

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
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
        this.setState({
          errors: {},
        });
        this.props.history.push('/presentations');
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
    const { errors } = this.state;
    const { classes } = this.props;
    const feedbackMessages = this.validateInputs();
    const activateButton = this.ableSubmitButton();

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6}>
          <Paper>
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
                Login In
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
