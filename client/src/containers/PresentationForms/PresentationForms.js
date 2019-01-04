import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  TextField,
  FormControl,
  FormHelperText,
  Button
} from "@material-ui/core";
import { DetailImage } from "../../components/UI/Icon/Icon";
import deepOrange from "@material-ui/core/colors/deepOrange";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexGrow: 1
  },
  textField: {
    margin: theme.spacing.unit,
    borderRadius: 4,
    backgroundColor: theme.palette.third.medium,
    width: "20rem"
  },
  cssLabel: {
    color: deepOrange[200],
    "&$cssFocused": {
      color: deepOrange[500]
    }
  },
  cssFocused: {},
  cssOutlinedInput: {
    "&$cssFocused": {
      borderColor: deepOrange[500]
    }
  },
  button: {
    margin: theme.spacing.unit
  },
  card: {
    maxWidth: 500,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: theme.palette.third.light,
    color: theme.palette.third.dark,
    margin: theme.spacing.unit * 5
  },
  CardHeader: {
    backgroundColor: theme.palette.secondary.main
  },
  topicText: {
    color: theme.palette.secondary.darker,
    fontWeight: 900
  },
  icons: {
    marginTop: 30,
    marginBottom: 10,
    marginRight: 10
  },
  updateIcon: {
    fontSize: 32,
    color: theme.palette.primary.dark
  },
  updateIconHover: {
    "&:hover": {
      color: theme.palette.primary.darker
    }
  },
  goBackButton: {
    flex: 1,
    position: "absolute",
    top: 150,
    left: 100
  },
  hintText: {
    color: theme.palette.secondary.main,
    fontSize: 15
  }
});

const FeedbackWithHints = ({ validity, uiClasses }) => {
  return validity ? (
    <FormHelperText className={uiClasses}>{validity}</FormHelperText>
  ) : null;
};

class PresentaionForms extends Component {
  state = {
    presenter: this.props.singlePresentation
      ? this.props.singlePresentation.presenter
      : "",
    evaluator: this.props.singlePresentation
      ? this.props.singlePresentation.evaluator
      : "",
    topic: this.props.singlePresentation
      ? this.props.singlePresentation.topic
      : "",
    article: this.props.singlePresentation
      ? this.props.singlePresentation.article
      : "",
    date: this.props.singlePresentation
      ? this.props.singlePresentation.date
      : "",
    keywords: this.props.singlePresentation
      ? this.props.singlePresentation.keywords
      : "",
    summary: this.props.singlePresentation
      ? this.props.singlePresentation.summary
      : "",
    touched: {
      presenter: false,
      evaluator: false,
      topic: false,
      article: false,
      date: false
    }
  };

  handleInputsChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleBlur = e => {
    this.setState({
      touched: { ...this.state.touched, [e.target.name]: true }
    });

    console.log({
      touched: { ...this.state.touched, [e.target.name]: true }
    });
  };

  validateInputs = (presenter, evaluator, topic, article, date) => {
    const hintMessage = {
      presenter: "",
      evaluator: "",
      topic: "",
      article: "",
      date: ""
    };

    const regex = {
      presenter: /^([\w+\s]){2,20}$/,
      evaluator: /^([\w+\s]){2,20}$/,
      topic: /^([\w+\s-']){2,100}$/,
      article: /^((http(s)?(:\/\/))+(www\.)?([\w\-./])*(\.[a-zA-Z]{2,3}\/?))[^\s\b\n|]*[^.,;:?!@^$ -]$/,
      date: /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])*$/
      //keywords: /^\w+(?:(?:\w)|(?:\s*,\s*\w+)+|(?:\s*,\w+)+)$/
    };

    const trimInputs = input => {
      if (input) {
        return input.trim();
      }
    };

    if (
      this.state.touched.presenter &&
      !regex.presenter.test(trimInputs(presenter))
    ) {
      hintMessage.presenter =
        "Presenter should be more than 2 characters, including space.";
    }

    if (
      this.state.touched.evaluator &&
      !regex.evaluator.test(trimInputs(evaluator))
    ) {
      hintMessage.evaluator =
        "Evaluator should be more than 2 characters, including space.";
    }

    if (this.state.touched.topic && !regex.topic.test(trimInputs(topic))) {
      hintMessage.topic =
        "Topic should be more than 2 in characters, numbers or _  - or ' ";
    }

    if (
      this.state.touched.article &&
      !regex.article.test(trimInputs(article))
    ) {
      hintMessage.article =
        "article should have URL format ex)https://www.example.io";
    }

    //Check whether date exist or not
    if (this.state.touched.date && !regex.date.test(date) && !date) {
      hintMessage.date = "Date, Month, Year should be selected";
    }

    //Instead of checking regex for keywords, trims them for users
    // if (this.state.touched.keywords && !regex.keywords.test(keywords)) {
    //   hintMessage.keywords = "Comma needs to seperate keywords";
    // }

    return hintMessage;
  };

  handleInputsSubmit = e => {
    e.preventDefault();

    const newPresentation = this.state;
    this.props.postNewPresentation(newPresentation);
    this.props.history.push("/presentations");
  };

  handleUpdate = (e, id) => {
    e.preventDefault();

    const edittedPresentation = this.state;

    this.props.editPresentation(edittedPresentation, id);
    this.props.history.push(`/presentations/${id}`);
  };

  ableSubmitButton = (presenter, evaluator, topic, article, date) => {
    const hintMessages = this.validateInputs(
      presenter,
      evaluator,
      topic,
      article,
      date
    );
    const inputValues = [presenter, evaluator, topic, article, date];

    //check whetehr hintMessage is empty("") or input values exist to able/disable submit button
    if (
      Object.values(hintMessages).every(message => message === "") &&
      inputValues.every(input => input !== "")
    ) {
      return false; //disable false
    }
    return true; //disable true
  };

  render() {
    // For creating input fields
    const { singlePresentation, formType, classes } = this.props;
    const inputsArr = [
      "presenter",
      "evaluator",
      "topic",
      "article",
      "date",
      "keywords",
      "summary"
    ];
    // For validating given inputs
    const { presenter, evaluator, topic, article, date } = this.state;

    const hintMessages = this.validateInputs(
      presenter,
      evaluator,
      topic,
      article,
      date
    );

    const activateButton = this.ableSubmitButton(
      presenter,
      evaluator,
      topic,
      article,
      date
    );

    //Controll inputs values for edit
    const inputValuesForEdit = {
      presenter,
      evaluator,
      topic,
      article,
      date
    };

    let keysOnSinglePresentation = null;
    //If it is edit type, give edit fields
    if (formType === "editForm" && singlePresentation) {
      //Get the all keys except _id and _V to create edit field with existing value
      keysOnSinglePresentation = Object.keys(singlePresentation).filter(
        key => key !== "_id" && key !== "__v"
      );

      return (
        <div>
          <Link to={`/presentations/${singlePresentation._id}`}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.goBackButton}
            >
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
          />
        </div>
      );
    }

    //If it's add type, it works as a form for adding presentation (reusable code)
    return (
      <div>
        <Link to="/presentations">
          <Button
            color="primary"
            variant="outlined"
            className={classes.goBackButton}
          >
            Go back
          </Button>
        </Link>
        <div className={classes.container}>
          <FormControl className={classes.margin}>
            {inputsArr.map((inputKey, index) => {
              if (inputKey === "date") {
                return (
                  <Fragment key={`${inputKey + index}`}>
                    <TextField
                      required
                      InputLabelProps={{
                        shrink: true,
                        root: classes.cssLabel
                      }}
                      InputProps={{
                        root: classes.cssOutlinedInput
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
              } else if (inputKey === "article") {
                return (
                  <Fragment key={`${inputKey + index}`}>
                    <TextField
                      required
                      InputLabelProps={{
                        shrink: true,
                        root: classes.cssLabel
                      }}
                      InputProps={{
                        root: classes.cssOutlinedInput
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
                inputKey === "presenter" ||
                inputKey === "evaluator" ||
                inputKey === "topic"
              ) {
                return (
                  <Fragment key={`${inputKey + index}`}>
                    <TextField
                      required
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel
                        }
                      }}
                      InputProps={{
                        classes: {
                          root: classes.cssOutlinedInput
                        }
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
                        root: classes.cssLabel
                      }
                    }}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput
                      }
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
    classes
  } = props;
  const { presenter, topic } = singlePresentation;

  return (
    <Grid container align="center">
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Presentor">{presenter.charAt(0)}</Avatar>
            }
            className={classes.CardHeader}
            title={presenter}
            subheader={topic}
          />
          <DetailImage />
          <CardContent>
            <FormControl>
              {keysOnSinglePresentation.map((inputKey, index) => {
                if (inputKey === "date") {
                  return (
                    <TextField
                      required
                      key={`${inputKey + index}`}
                      InputLabelProps={{
                        shrink: true,
                        classes: {
                          root: classes.cssLabel
                        }
                      }}
                      InputProps={{
                        root: classes.cssOutlinedInput
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
                  );
                }

                return (
                  <TextField
                    key={`${inputKey + index}`}
                    InputLabelProps={{
                      shrink: true,
                      root: classes.cssLabel
                    }}
                    InputProps={{
                      root: classes.cssOutlinedInput
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
                );
              })}
              <Button
                onClick={e => handleUpdate(e, singlePresentation._id)}
                variant="contained"
                color="secondary"
              >
                Update
              </Button>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

PresentaionForms.propTypes = {
  editable: PropTypes.bool
};

export default withStyles(styles)(PresentaionForms);
