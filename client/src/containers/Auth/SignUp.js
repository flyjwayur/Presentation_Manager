import React, { Component } from 'react';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import TextInputField from '../../components/UI/TextInputField/TextInputField';
import validateSignUpForm from '../../Validation/validateSignUpForm';

import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexGrow: 1,
  },
  SingUp__title: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 3,
    padding: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
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
    this.validateInputs();
  };

  handleBlur = e => {
    this.setState(
      {
        touched: { ...this.state.touched, [e.target.name]: true },
      },
      console.log('on blur', this.state.touched),
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    const data = { username, email, password, password2 };

    axios
      .post('/api/users/signup', data)
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
    const { username, email, password, password2 } = this.state;

    const inputs = { username, email, password, password2 };
    const validationMessage = validateSignUpForm(inputs, this.state.touched);
    console.log('in validateInputs', validationMessage);
    return validationMessage;
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    const feedbackMessages = this.validateInputs();

    return (
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Paper>
            <div className={classes.SingUp__title}>
              <Typography variant='h5' component='h3'>
                Sign Up
              </Typography>
              <Typography component='p'>Create your account</Typography>
            </div>
            <form className={classes.container} onSubmit={this.handleSubmit}>
              <TextInputField
                required
                name='username'
                placeholder='User Name'
                value={this.state.username}
                onChange={this.handleChange}
                feedbackMessages={feedbackMessages.hints.username}
                errors={errors.username}
                style={classes.textField}
                onBlur={this.handleBlur}
              />
              <TextInputField
                required
                name='email'
                type='email'
                placeholder='Email'
                value={this.state.email}
                onChange={this.handleChange}
                info='Use an email connected with a gravatar image.'
                feedbackMessages={feedbackMessages.hints.email}
                errors={errors.email}
                style={classes.textField}
                onBlur={this.handleBlur}
              />
              <TextInputField
                required
                name='password'
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleChange}
                feedbackMessages={feedbackMessages.hints.password}
                errors={errors.password}
                style={classes.textField}
                onBlur={this.handleBlur}
              />
              <TextInputField
                required
                name='password2'
                type='password'
                placeholder='Confirm password'
                value={this.state.password2}
                onChange={this.handleChange}
                errors={errors.password2}
                feedbackMessages={feedbackMessages.hints.password2}
                style={classes.textField}
                onBlur={this.handleBlur}
              />
              <Button type='submit'>Create</Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

SignUp.propTypes = {};

export default withStyles(styles)(SignUp);
