import React, {Component} from 'react';
//import TextInputField from '../shared/TextInputField';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button
} from "@material-ui/core";
import FormDialog from '../../components/UI/Dialogs/Dialogs';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexGrow: 1
  }
});


class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
    open : false,
    setOpen : false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {name, email, password, password2} = this.state;
    const data = {name, email, password, password2};
    axios
      .post('/api/users/signup', data)
      .then(res => {
        this.setState({
          errors: {},
        });
        this.props.history.push('/signin');
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
        });
      });
  };

  //For UI : Dialog

  render() {
    const {errors} = this.state;
    return (
    <FormDialog/>
    );
  }
}

SignUp.propTypes = {};

export default withStyles(styles)(SignUp);
