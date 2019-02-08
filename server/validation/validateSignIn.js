const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateSignInInput = data => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  // Compare the 'confirm password' to check whether it's same as password in the client side

  //Check empty
  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Email field is required';
  }

  //Check length, email
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email must be valid';
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = 'Password must be 8 characters.';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateSignInInput;
