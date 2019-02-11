import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Pageview from '@material-ui/icons/Pageview';
import BorderColor from '@material-ui/icons/BorderColor';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const styles = theme => ({
  tableCell: {
    backgroundColor: theme.palette.secondary.main,
  },
  card: {
    margin: theme.spacing.unit * 2,
  },
  cardHeader: {
    backgroundColor: theme.palette.secondary.main,
  },
  cardContent: {
    margin: theme.spacing.unit * 3,
  },
  viewIcon: {
    fontSize: 32,
    color: theme.palette.primary.dark,
  },
  viewIconHover: {
    '&:hover': {
      color: theme.palette.primary.darker,
    },
  },
  editIcon: {
    fontSize: 32,
    color: theme.palette.secondary.main,
    marginLeft: '1rem',
  },
  editIconHover: {
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
  },
  deleteIcon: {
    fontSize: 32,
    color: theme.palette.secondary.dark,
    marginLeft: '1rem',
  },
  deleteIconHover: {
    '&:hover': {
      color: theme.palette.secondary.darker,
    },
  },
});

class PresentationCard extends Component {
  handleDelete = e => {
    const answer = window.confirm(
      'Do you really want to delete the presentation?',
    );
    if (answer) {
      const selectedPresentation = this.props.presentation;
      this.props.deletePresentation(
        selectedPresentation,
        selectedPresentation._id,
      );
    }
  };

  handleEdit = e => {
    const selectedPresentation = this.props.presentation;
    this.props.history.push(`/presentations/${selectedPresentation._id}/edit`);
  };

  render() {
    const {
      _id,
      presenter,
      evaluator,
      topic,
      article,
      date,
    } = this.props.presentation;

    //Classes for style
    const { classes } = this.props;
    return (
      <Grid container direction='column' alignItems='center'>
        <Card className={classes.card}>
          <CardHeader title={topic} className={classes.cardHeader}>
            {/* <Typography variant='h6' gutterBottom color='secondary'>
              {topic}
            </Typography> */}
          </CardHeader>
          <CardContent className={classes.cardContent}>
            <Grid container direction='column' alignItems='flex-start'>
              <Typography variant='subtitle1'>
                Presenter: {presenter}
              </Typography>
              <Typography variant='body1'>Evaluator : {evaluator}</Typography>
              <Typography variant='body1'>Article : {article}</Typography>
              <Typography variant='body1'>
                Date: {moment(date).format('YYYY-MM-DD')}
              </Typography>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justify='center'>
              <Link
                to={`/presentations/${_id}`}
                style={{ textDecoration: 'none' }}
              >
                <Pageview
                  className={classNames(
                    classes.viewIcon,
                    classes.viewIconHover,
                  )}
                />
              </Link>
              <BorderColor
                className={classNames(classes.editIcon, classes.editIconHover)}
                onClick={this.handleEdit}
              />
              <DeleteForeverOutlinedIcon
                className={classNames(
                  classes.deleteIcon,
                  classes.deleteIconHover,
                )}
                onClick={this.handleDelete}
              />
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(PresentationCard);
