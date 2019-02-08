const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateSignUpInput = data => {
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  //In Client side, it will check whether password & password2 are matched or not

  //Check length, email
  if (!validator.isLength(data.username, { min: 2 })) {
    errors.username = 'Username must be more than 2characters';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email must be valid';
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = 'Password must be between 8 characters.';
  }

  //Check empty
  if (isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateSignUpInput;
