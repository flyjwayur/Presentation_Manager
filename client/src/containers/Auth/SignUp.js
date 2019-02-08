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
import validateSignUpForm from '../../Validation/validateSignUpForm';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexGrow: 1,
  },
  signUp__form_container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  signUp__form_title: {
    backgroundColor: theme.palette.primary.darker,
    borderRadius: 4,
    padding: theme.spacing.unit * 2,
  },
  signUp_form_button: {
    margin: theme.spacing.unit * 3,
  },
});

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
    touched: {},
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
    console.log('submit', e);
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    const data = { username, email, password, password2 };

    axios
      .post('/api/users/signup', data)
      .then(res => {
        this.setState({
          errors: {},
        });
        this.props.history.push('/signIn');
      })
      .catch(err => {
        console.log('error from server', err.response);
        this.setState({
          errors: err.response.data,
        });
      });
  };

  validateInputs = () => {
    const { username, email, password, password2 } = this.state;

    const inputs = { username, email, password, password2 };
    const validationMessage = validateSignUpForm(inputs, this.state.touched);
    return validationMessage;
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    const feedbackMessages = this.validateInputs();

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <div className={classes.signUp__form_title}>
              <Typography variant='h5' color='textSecondary' gutterBottom>
                Sign Up
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                Create your account
              </Typography>
            </div>
            <FormControl className={classes.signUp__form_container}>
              <TextInputField
                required
                name='username'
                type='text'
                placeholder='User Name*'
                value={this.state.username}
                onChange={this.handleChange}
                feedbackMessages={feedbackMessages.hints.username}
                errors={errors.username}
                onBlur={this.handleBlur}
              />
              <TextInputField
                required
                name='email'
                type='email'
                placeholder='Email*'
                value={this.state.email}
                onChange={this.handleChange}
                info='Use an email connected with a gravatar image.'
                feedbackMessages={feedbackMessages.hints.email}
                errors={errors.email}
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
                errors={errors.password}
                onBlur={this.handleBlur}
              />
              <TextInputField
                required
                name='password2'
                type='password'
                placeholder='Confirm password*'
                value={this.state.password2}
                onChange={this.handleChange}
                errors={errors.password2}
                feedbackMessages={feedbackMessages.hints.password2}
                onBlur={this.handleBlur}
              />
              <Button
                type='submit'
                onClick={this.handleSubmit}
                variant='contained'
                color='primary'
                className={classes.signUp_form_button}
              >
                Create
              </Button>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

SignUp.propTypes = {};

export default withStyles(styles)(SignUp);
