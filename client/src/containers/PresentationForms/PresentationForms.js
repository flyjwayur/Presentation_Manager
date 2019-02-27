import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  TextField,
  FormControl,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { DetailImage } from '../../components/UI/Icon/Icon';
import deepOrange from '@material-ui/core/colors/deepOrange';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexGrow: 1,
  },
  textField: {
    margin: theme.spacing.unit,
    borderRadius: 4,
    backgroundColor: theme.palette.third.medium,
    width: '20rem',
  },
  cssLabel: {
    color: deepOrange[200],
    '&$cssFocused': {
      color: deepOrange[500],
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused': {
      borderColor: deepOrange[500],
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    maxWidth: 500,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: theme.palette.third.light,
    color: theme.palette.third.dark,
    margin: theme.spacing.unit * 5,
  },
  CardHeader: {
    backgroundColor: theme.palette.secondary.main,
  },
  topicText: {
    color: theme.palette.secondary.darker,
    fontWeight: 900,
  },
  icons: {
    marginTop: 30,
    marginBottom: 10,
    marginRight: 10,
  },
  updateIcon: {
    fontSize: 32,
    color: theme.palette.primary.dark,
  },
  updateIconHover: {
    '&:hover': {
      color: theme.palette.primary.darker,
    },
  },
  goBackLinkButton: {
    textDecoration: 'none',
  },
  topGoBackButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 5,
    },
    display: 'none',
  },
  BottomGoBackButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    flexGrow: 1,
    margin: theme.spacing.unit * 5,
  },

  hintText: {
    color: theme.palette.secondary.main,
    fontSize: 15,
  },
});

const FeedbackWithHints = ({ validity, uiClasses }) => {
  return validity ? <FormHelperText className={uiClasses}>{validity}</FormHelperText> : null;
};

class PresentationForms extends Component {
  state = {
    presenter: this.props.singlePresentation ? this.props.singlePresentation.presenter : '',
    evaluator: this.props.singlePresentation ? this.props.singlePresentation.evaluator : '',
    topic: this.props.singlePresentation ? this.props.singlePresentation.topic : '',
    article: this.props.singlePresentation ? this.props.singlePresentation.article : '',
    date: this.props.singlePresentation ? this.props.singlePresentation.date : '',
    keywords: this.props.singlePresentation ? this.props.singlePresentation.keywords : '',
    summary: this.props.singlePresentation ? this.props.singlePresentation.summary : '',
    touched: {
      presenter: false,
      evaluator: false,
      topic: false,
      article: false,
      date: false,
    },
  };
  componentDidMount() {
    if (!localStorage.getItem('jwttoken')) {
      return <redirect to="/signin" />;
    }
  }

  handleInputsChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleBlur = e => {
    this.setState({
      touched: { ...this.state.touched, [e.target.name]: true },
    });
  };

  validateInputs = (presenter, evaluator, topic, article, date) => {
    const hintMessage = {
      presenter: '',
      evaluator: '',
      topic: '',
      article: '',
      date: '',
    };

    const regex = {
      presenter: /^([\w+\s]){2,20}$/,
      evaluator: /^([\w+\s]){2,20}$/,
      topic: /^([\w+\s-']){2,100}$/,
      article: /^((http(s)?(:\/\/))+(www\.)?([\w\-./])*(\.[a-zA-Z]{2,3}\/?))[^\s\b\n|]*[^.,;:?!@^$ -]$/,
      date: /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])*$/,
      //keywords: /^\w+(?:(?:\w)|(?:\s*,\s*\w+)+|(?:\s*,\w+)+)$/
    };

    const trimInputs = input => {
      if (input) {
        return input.trim();
      }
    };

    if (this.state.touched.presenter && !regex.presenter.test(trimInputs(presenter))) {
      hintMessage.presenter = 'Presenter should be more than 2 characters, including space.';
    }

    if (this.state.touched.evaluator && !regex.evaluator.test(trimInputs(evaluator))) {
      hintMessage.evaluator = 'Evaluator should be more than 2 characters, including space.';
    }

    if (this.state.touched.topic && !regex.topic.test(trimInputs(topic))) {
      hintMessage.topic = "Topic should be more than 2 in characters, numbers or _  - or ' ";
    }

    if (this.state.touched.article && !regex.article.test(trimInputs(article))) {
      hintMessage.article = 'article should have URL format ex)https://www.example.io';
    }

    //Check whether date exist or not
    if (this.state.touched.date && !regex.date.test(date) && !date) {
      hintMessage.date = 'Date, Month, Year should be selected';
    }

    //Instead of checking regex for keywords, trims them for users
    // if (this.state.touched.keywords && !regex.keywords.test(keywords)) {
    //   hintMessage.keywords = "Comma needs to separate keywords";
    // }

    return hintMessage;
  };

  handleInputsSubmit = e => {
    e.preventDefault();

    // When 'onAddPresentation' gets called,
    // if there is error, clients gets error from 'SERVER' in addPresentation action
    // And it displays the all error messages for input fields hints
    const newPresentation = this.state;

    console.log('before : validationErrorMessage', this.props.validationErrorMessage);
    this.props
      .onAddPresentation(newPresentation)
      .then(() => {
        if (this.props.validationErrorMessage) {
          this.props.history.push('/presentations');
        }
      })
      .catch(err => console.log(err));

    console.log('after : validationErrorMessage', this.props.validationErrorMessage);
  };

  handleUpdate = (e, id) => {
    e.preventDefault();

    const edittedPresentation = this.state;

    this.props.editPresentation(edittedPresentation, id);
    this.props.history.push(`/presentations/${id}`);
  };

  ableSubmitButton = (presenter, evaluator, topic, article, date) => {
    const hintMessages = this.validateInputs(presenter, evaluator, topic, article, date);
    const inputValues = [presenter, evaluator, topic, article, date];

    //check whether hintMessage is empty("") or input values exist to able/disable submit button
    if (
      Object.values(hintMessages).every(message => message === '') &&
      inputValues.every(input => input !== '')
    ) {
      return false; //disable false
    }
    return true; //disable true
  };

  render() {
    // For creating input fields
    const { singlePresentation, formType, classes } = this.props;
    const inputsArr = ['presenter', 'evaluator', 'topic', 'article', 'date', 'keywords', 'summary'];
    // For validating given inputs
    const { presenter, evaluator, topic, article, date, keywords, summary } = this.state;

    const hintMessages = this.validateInputs(presenter, evaluator, topic, article, date);

    const activateButton = this.ableSubmitButton(presenter, evaluator, topic, article, date);

    //Control inputs values for edit
    const inputValuesForEdit = {
      presenter,
      evaluator,
      topic,
      article,
      date,
      keywords,
      summary,
    };

    let keysOnSinglePresentation = null;
    //If it is edit type, give edit fields
    if (formType === 'editForm' && singlePresentation) {
      //Get the all keys except _id and _V to create edit field with existing value
      keysOnSinglePresentation = Object.keys(singlePresentation).filter(
        key => key !== '_id' && key !== '__v'
      );

      return (
        <div>
          <Link
            to={`/presentations/${singlePresentation._id}`}
            className={classes.goBackLinkButton}
          >
            <Button color="primary" variant="outlined" className={classes.topGoBackButton}>
              Go Back
            </Button>
          </Link>
          <Edit
            keysOnSinglePresentation={keysOnSinglePresentation}
            singlePresentation={singlePresentation}
            inputValuesForEdit={inputValuesForEdit}
            handleInputsChange={this.handleInputsChange}
            handleUpdate={this.handleUpdate}
            handleBlur={this.handleBlur}
            allInputs={this.state}
            classes={classes}
            hintMessages={hintMessages}
            activateButton={activateButton}
          />
        </div>
      );
    }

    //If it's add type, it works as a form for adding presentation (reusable code)
    return (
      <div>
        <Link to="/presentations" className={classes.goBackLinkButton}>
          <Button color="primary" variant="outlined" className={classes.topGoBackButton}>
            Go back
          </Button>
        </Link>

        <div>
          {Object.values(this.props.validationErrorMessage).map((error, index) => {
            return <div key={index}>{error}</div>;
          })}
        </div>
        <div className={classes.container}>
          <FormControl>
            {inputsArr.map((inputKey, index) => {
              if (inputKey === 'date') {
                return (
                  <Fragment key={`${inputKey + index}`}>
                    <TextField
                      required
                      InputLabelProps={{
                        shrink: true,
                        root: classes.cssLabel,
                      }}
                      InputProps={{
                        root: classes.cssOutlinedInput,
                      }}
                      label={`${inputKey}`}
                      variant="filled"
                      type="date"
                      id={`${inputKey}`}
                      name={`${inputKey}`}
                      value={`${this.state[inputKey]}`}
                      onChange={this.handleInputsChange}
                      onBlur={this.handleBlur}
                      className={classes.textField}
                    />
                    <FeedbackWithHints
                      validity={hintMessages[inputKey]}
                      uiClasses={classes.hintText}
                    />
                  </Fragment>
                );
              } else if (inputKey === 'article') {
                return (
                  <Fragment key={`${inputKey + index}`}>
                    <TextField
                      required
                      InputLabelProps={{
                        shrink: true,
                        root: classes.cssLabel,
                      }}
                      InputProps={{
                        root: classes.cssOutlinedInput,
                      }}
                      label={`${inputKey}`}
                      variant="filled"
                      type="url"
                      id={`${inputKey}`}
                      name={`${inputKey}`}
                      value={`${this.state[inputKey]}`}
                      onChange={this.handleInputsChange}
                      onBlur={this.handleBlur}
                      className={classes.textField}
                    />
                    <FeedbackWithHints
                      validity={hintMessages[inputKey]}
                      uiClasses={classes.hintText}
                    />
                  </Fragment>
                );
              } else if (
                inputKey === 'presenter' ||
                inputKey === 'evaluator' ||
                inputKey === 'topic'
              ) {
                return (
                  <Fragment key={`${inputKey + index}`}>
                    <TextField
                      required
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.cssOutlinedInput,
                        },
                      }}
                      label={`${inputKey}`}
                      variant="filled"
                      type="text"
                      id={`${inputKey}`}
                      name={`${inputKey}`}
                      value={`${this.state[inputKey]}`}
                      onChange={this.handleInputsChange}
                      onBlur={this.handleBlur}
                      className={classes.textField}
                    />
                    <FeedbackWithHints
                      validity={hintMessages[inputKey]}
                      uiClasses={classes.hintText}
                    />
                  </Fragment>
                );
              }

              return (
                <Fragment key={`${inputKey + index}`}>
                  <TextField
                    InputLabelProps={{
                      classes: {
                        root: classes.cssLabel,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                      },
                    }}
                    label={`${inputKey}`}
                    variant="filled"
                    type="text"
                    id={`${inputKey}`}
                    name={`${inputKey}`}
                    value={`${this.state[inputKey]}`}
                    onChange={this.handleInputsChange}
                    onBlur={this.handleBlur}
                    className={classes.textField}
                  />
                  <FeedbackWithHints
                    validity={hintMessages[inputKey]}
                    uiClasses={classes.hintText}
                  />
                </Fragment>
              );
            })}
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              type="submit"
              onClick={this.handleInputsSubmit}
              disabled={activateButton}
            >
              Add Presentation
            </Button>
          </FormControl>
        </div>
        <Link to="/presentations" className={classes.goBackLinkButton}>
          <Button variant="outlined" color="primary" className={classes.BottomGoBackButton}>
            Go Back
          </Button>
        </Link>
      </div>
    );
  }
}

const Edit = props => {
  const {
    keysOnSinglePresentation,
    singlePresentation,
    inputValuesForEdit,
    handleUpdate,
    handleBlur,
    handleInputsChange,
    hintMessages,
    activateButton,
    classes,
  } = props;
  const { presenter, topic } = singlePresentation;

  return (
    <Grid container align="center">
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar aria-label="Presentor">{presenter.charAt(0)}</Avatar>}
            className={classes.CardHeader}
            title={presenter}
            subheader={topic}
          />
          <DetailImage />
          <CardContent>
            <FormControl>
              {keysOnSinglePresentation.map((inputKey, index) => {
                if (inputKey === 'date') {
                  return (
                    <Fragment key={`${inputKey + index}`}>
                      <TextField
                        required
                        InputLabelProps={{
                          shrink: true,
                          root: classes.cssLabel,
                        }}
                        InputProps={{
                          root: classes.cssOutlinedInput,
                        }}
                        label={`${inputKey}`}
                        variant="filled"
                        type="date"
                        id={`${inputKey}`}
                        name={`${inputKey}`}
                        value={inputValuesForEdit.date}
                        onChange={handleInputsChange}
                        onBlur={handleBlur}
                        className={classes.textField}
                      />
                      <FeedbackWithHints
                        validity={hintMessages[inputKey]}
                        uiClasses={classes.hintText}
                      />
                    </Fragment>
                  );
                } else if (inputKey === 'article') {
                  return (
                    <Fragment key={`${inputKey + index}`}>
                      <TextField
                        required
                        InputLabelProps={{
                          shrink: true,
                          root: classes.cssLabel,
                        }}
                        InputProps={{
                          root: classes.cssOutlinedInput,
                        }}
                        label={`${inputKey}`}
                        variant="filled"
                        type="url"
                        id={`${inputKey}`}
                        name={`${inputKey}`}
                        value={inputValuesForEdit[`${inputKey}`]}
                        onChange={handleInputsChange}
                        onBlur={handleBlur}
                        className={classes.textField}
                      />
                      <FeedbackWithHints
                        validity={hintMessages[inputKey]}
                        uiClasses={classes.hintText}
                      />
                    </Fragment>
                  );
                } else if (
                  inputKey === 'presenter' ||
                  inputKey === 'evaluator' ||
                  inputKey === 'topic'
                ) {
                  return (
                    <Fragment key={`${inputKey + index}`}>
                      <TextField
                        required
                        InputLabelProps={{
                          classes: {
                            root: classes.cssLabel,
                          },
                        }}
                        InputProps={{
                          classes: {
                            root: classes.cssOutlinedInput,
                          },
                        }}
                        label={`${inputKey}`}
                        variant="filled"
                        type="text"
                        id={`${inputKey}`}
                        name={`${inputKey}`}
                        value={inputValuesForEdit[`${inputKey}`]}
                        onChange={handleInputsChange}
                        onBlur={handleBlur}
                        className={classes.textField}
                      />
                      <FeedbackWithHints
                        validity={hintMessages[inputKey]}
                        uiClasses={classes.hintText}
                      />
                    </Fragment>
                  );
                }
                return (
                  <Fragment key={`${inputKey + index}`}>
                    <TextField
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.cssOutlinedInput,
                        },
                      }}
                      label={`${inputKey}`}
                      variant="filled"
                      type="text"
                      id={`${inputKey}`}
                      name={`${inputKey}`}
                      value={inputValuesForEdit[`${inputKey}`]}
                      onChange={handleInputsChange}
                      onBlur={handleBlur}
                      className={classes.textField}
                    />
                    <FeedbackWithHints
                      validity={hintMessages[inputKey]}
                      uiClasses={classes.hintText}
                    />
                  </Fragment>
                );
              })}
              <Button
                onClick={e => handleUpdate(e, singlePresentation._id)}
                variant="contained"
                color="secondary"
                disabled={activateButton}
              >
                Update
              </Button>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
      <Link to={`/presentations/${singlePresentation._id}`} className={classes.goBackLinkButton}>
        <Button variant="outlined" color="primary" className={classes.BottomGoBackButton}>
          Go Back
        </Button>
      </Link>
    </Grid>
  );
};

PresentationForms.propTypes = {
  editable: PropTypes.bool,
};

export default withStyles(styles)(PresentationForms);
