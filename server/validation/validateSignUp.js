const validator = require("validator");
const isEmpty = require("./isEmpty");


const validateSignUpInput = data => {
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Compare the 'comfirm password' to check whether it's same as passowrd in the client side

  //Check empty 

  if (isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (isEmpty(data.password)) {
    errors.password = "Email field is required";
  } 

  //Check length, email
  if (!validator.isLength(data.username, { min: 2, max: 15 })) {
    errors.username = "Username must be between 2 to 15 characters";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email must be valid";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 to 30 characters.";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateSignUpInput;
