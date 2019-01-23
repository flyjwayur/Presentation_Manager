import validator from 'validator';
import { isEmpty } from './isEmpty';

const validateAddForm = (values, touched) => {
  const errors = {};

  values.presenter = !isEmpty(values.presenter) ? values.presenter : '';
  values.evaluator = !isEmpty(values.evaluator) ? values.evaluator : '';
  values.topic = !isEmpty(values.topic) ? values.topic : '';
  values.article = !isEmpty(values.article) ? values.article : '';
  values.date = !isEmpty(values.date) ? values.date : '';

  const touchedPresenter = touched ? touched.presenter : false;
  const touchedEvaluator = touched ? touched.evaluator : false;
  const touchedTopic = touched ? touched.topic : false;
  const touchedArticle = touched ? touched.article : false;
  const touchedDate = touched ? touched.date : false;

  if (touchedPresenter && !validator.isLength(values.presenter, { min: 2 })) {
    errors.presenter = 'Presenter should be more than 2 characters';
  }

  if (touchedEvaluator && !validator.isLength(values.evaluator, { min: 2 })) {
    errors.evaluator = 'Evaluator should be more than 2 characters';
  }

  if (touchedTopic && !validator.isLength(values.topic, { min: 2 })) {
    errors.topic = 'Topic should be more than 2 characters';
  }

  if (touchedArticle && !validator.isURL(values.article)) {
    errors.article = 'Article should have URL format with http/https/ftp';
  }

  if (touchedPresenter && isEmpty(values.presenter)) {
    errors.presenter = 'Presenter field is required';
  }

  if (touchedEvaluator && isEmpty(values.evaluator)) {
    errors.evaluator = 'Evaluator field is required';
  }

  if (touchedTopic && isEmpty(values.topic)) {
    errors.topic = 'Topic field is required';
  }

  if (touchedArticle && isEmpty(values.article)) {
    errors.article = 'The article field is required';
  }

  if (touchedDate && isEmpty(values.date)) {
    errors.date = 'The date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAddForm;
