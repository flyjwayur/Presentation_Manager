const validator = require("validator");
const { isEmpty } = require("./isEmpty");

const validateAddPresentationInput = (data) => {
  const errors = {};

  data.presenter = !isEmpty(data.presenter) ? data.presenter : "";
  data.evaluator = !isEmpty(data.evaluator) ? data.evaluator : "";
  data.topic = !isEmpty(data.topic) ? data.topic : "";
  data.article = !isEmpty(data.article) ? data.article : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.keywords = !isEmpty(data.keywords) ? data.keywords : "";
  data.summary = !isEmpty(data.summary) ? data.summary : "";

  // if(isEmpty(data.email)){
  //   errors.email = "Email field is required";
  // }else{
  //   if(!validator.isEmail(data.email)){
  //     errors.email = "It should be a valid email";
  //   }
  // }

  /* General not empty in these fields : presenter, evaluator, topic, articel, date*/

  /* Specific requirements*/

  //presenter : Presenter should be more than 2 characters, including space.
  //evaluator : Evaluator should be more than 2 characters, including space.
  //topic : Topic should be more than 2 in characters, numbers or _  - or '
  //article : Article should have URL format ex)https://www.example.io
  //date : Date, Month, Year should be selected

  if (!validator.isLength(data.presenter, { min: 2 })) {
    errors.presenter = "Presenter should be more than 2 characters";
  }

  if (!validator.isLength(data.evaluator, { min: 2 })) {
    errors.evaluator = "Evaluator should be more than 2 characters";
  }

  if (!validator.isLength(data.topic, { min: 2 })) {
    errors.topic = "Topic should be more than 2 characters";
  }

  if (!validator.isURL(data.article)) {
    erorrs.article = "Article should have URL format with http/https/ftp";
  }

  if (!validator.isISO8601(data.date)) {
    erorrs.date = "It should be a valid date";
  }

  if (isEmpty(data.presenter)) {
    errors.presenter = "Presenter field is required";
  }

  if (isEmpty(data.evaluator)) {
    errors.evaluator = "Evaluator field is required";
  }

  if (isEmpty(data.topic)) {
    errors.topic = "Topic field is required";
  }

  if (isEmpty(data.article)) {
    errors.article = "The article field is required";
  }

  if (isEmpty(data.date)) {
    errors.date = "The date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateAddPresentationInput;
