import React, { Component } from "react";
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
  }
});

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
      : ""
  };

  handleInputsChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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

  render() {
    const { singlePresentation, formType, classes } = this.props;

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
            handleInputsChange={this.handleInputsChange}
            handleUpdate={this.handleUpdate}
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
            {Object.keys(this.state).map((inputKey, index) => {
              if (inputKey === "date") {
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
                    type="date"
                    id={`${inputKey}`}
                    name={`${inputKey}`}
                    value={`${this.state[inputKey]}`}
                    onChange={this.handleInputsChange}
                    className={classes.textField}
                  />
                );
              }
              return (
                <TextField
                  key={`${inputKey + index}`}
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
                  variant="outlined"
                  type="text"
                  id={`${inputKey}`}
                  name={`${inputKey}`}
                  value={`${this.state[inputKey]}`}
                  onChange={this.handleInputsChange}
                  className={classes.textField}
                />
              );
            })}
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              type="submit"
              onClick={this.handleInputsSubmit}
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
    handleUpdate,
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
                      defaultValue={`${singlePresentation[inputKey]}`}
                      onChange={handleInputsChange}
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
                    defaultValue={`${singlePresentation[inputKey]}`}
                    onChange={handleInputsChange}
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
