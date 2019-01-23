import validator from 'validator';
import { isEmpty } from './isEmpty';

const validateSignUpForm = (inputs, touched) => {
  console.log('inputs in validation', inputs);
  console.log('touched in validation', touched);
  const hints = {};

  inputs.username = !isEmpty(inputs.username) ? inputs.username : '';
  inputs.email = !isEmpty(inputs.email) ? inputs.email : '';
  inputs.password = !isEmpty(inputs.password) ? inputs.password : '';
  inputs.password2 = !isEmpty(inputs.password2) ? inputs.password2 : '';

  const touchedUsername = touched ? touched.username : false;
  const touchedEmail = touched ? touched.email : false;
  const touchedPassword = touched ? touched.password : false;
  const touchedPassword2 = touched ? touched.password2 : false;

  if (touchedUsername && !validator.isLength(inputs.username, { min: 2 })) {
    hints.username = 'Username must be more than 2 characters';
  }

  if (touchedEmail && !validator.isEmail(inputs.email)) {
    hints.email = 'Email must be valid';
  }

  if (touchedPassword && !validator.isLength(inputs.password, { min: 8 })) {
    hints.password = 'Password must be more than 8 characters';
  }

  if (touchedPassword2 && inputs.password2 !== inputs.password) {
    hints.password2 = 'Passwords are NOT matched';
  }

  if (touchedUsername && isEmpty(inputs.username)) {
    hints.username = 'Username field is required';
  }

  if (touchedEmail && isEmpty(inputs.email)) {
    hints.email = 'Email field is required';
  }

  if (touchedPassword && isEmpty(inputs.password)) {
    hints.password = 'Password field is required';
  }

  if (touchedPassword2 && isEmpty(inputs.password2)) {
    hints.password2 = 'Password Confirmation field is required';
  }

  return {
    hints,
    isValid: isEmpty(hints),
  };
};

export default validateSignUpForm;
