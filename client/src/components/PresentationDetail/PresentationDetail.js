import React, { Component, Fragment } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Button
} from "@material-ui/core";
import { DetailImage } from "../../components/UI/Icon/Icon";
import BorderColor from "@material-ui/icons/BorderColor";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import classNames from "classnames";

const styles = theme => ({
  card: {
    maxWidth: 500,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: theme.palette.third.light,
    color: theme.palette.third.dark,
    margin : theme.spacing.unit * 5
  },
  CardHeader: {
    backgroundColor: theme.palette.secondary.main
  },
  topicText : {
    color: theme.palette.secondary.darker,
    fontWeight : 900
  },
  icons: {
    marginTop: 30,
    marginBottom: 10,
    marginRight: 10
  },
  editIcon: {
    fontSize: 32,
    color: theme.palette.primary.dark
  },
  editIconHover: {
    "&:hover": {
      color: theme.palette.primary.darker
    }
  },
  deleteIcon: {
    fontSize: 32,
    color: theme.palette.secondary.main
  },
  deleteIconHover: {
    "&:hover": {
      color: theme.palette.secondary.dark
    }
  },
  goBackButton : {
    flex : 1,
    position: "absolute",
    top: 150,
    left: 100
  }
});

class PresentationDetail extends Component {
  enableEdit = e => {
    this.props.history.push(
      `/presentations/${this.props.match.params.presentationId}/edit`
    );
  };

  handleDelete = e => {
    const selectedPresentation = this.props.singlePresentation;
    this.props.deletePresentation(
      selectedPresentation,
      selectedPresentation._id
    );
    this.props.history.push("/");
  };

  renderPresentationDetail = () => {
    const singlePresentation = this.props.singlePresentation;
    if (singlePresentation) {
      const {
        presenter,
        evaluator,
        topic,
        article,
        keywords,
        date,
        summary
      } = singlePresentation;

      const { classes } = this.props;
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
                <Typography variant="h6" className={classes.topicText}>
                  <span>Topic:</span> {topic}
                </Typography>
              </CardContent>
              <p>
                <span>Evaluator: </span>
                {evaluator}
              </p>
              <p>
                <span>Article: </span>
                {article}
              </p>
              <p>
                <span>Keywords: </span>
                {keywords}
              </p>
              <p>
                <span>Date: </span>
                {date}
              </p>
              <p>
                <span>Summary: </span>
                {summary}
              </p>
              <div className={classes.icons}>
                <BorderColor
                  className={classNames(
                    classes.editIcon,
                    classes.editIconHover
                  )}
                  onClick={this.enableEdit}
                />
                <DeleteForeverOutlinedIcon
                  className={classNames(
                    classes.deleteIcon,
                    classes.deleteIconHover
                  )}
                  onClick={this.handleDelete}
                />
              </div>
            </Card>
          </Grid>
        </Grid>
      );
    } else {
      return <h1>There is no presentation.</h1>;
    }
  };

  render() {
    const { error, isLoading, classes } = this.props;

    return (
      <Fragment>
        {error && (
          <div style={{ color: "#900" }}>
            <div>{error.title}</div>
          </div>
        )}
        {isLoading && <Spinner />}
        <Link to="/presentations">
        <Button variant="outlined" color="primary" className={classes.goBackButton}>
            Go Back
          </Button>
        </Link>
        {this.renderPresentationDetail()}
      </Fragment>
    );
  }
}

export default withStyles(styles)(PresentationDetail);
