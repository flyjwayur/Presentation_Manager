import validator from 'validator';
import { isEmpty } from './isEmpty';

const validateSignInForm = (inputs, touched) => {
  const hints = {};

  inputs.email = !isEmpty(inputs.email) ? inputs.email : '';
  inputs.password = !isEmpty(inputs.password) ? inputs.password : '';

  const touchedEmail = touched ? touched.email : false;
  const touchedPassword = touched ? touched.password : false;

  if (touchedEmail && !validator.isEmail(inputs.email)) {
    hints.email = 'Email must be valid';
  }

  if (touchedPassword && !validator.isLength(inputs.password, { min: 8 })) {
    hints.password = 'Password must be more than 8 characters';
  }

  if (touchedEmail && isEmpty(inputs.email)) {
    hints.email = 'Email field is required';
  }

  if (touchedPassword && isEmpty(inputs.password)) {
    hints.password = 'Password field is required';
  }

  return {
    hints,
    isValid: isEmpty(hints),
  };
};

export default validateSignInForm;
