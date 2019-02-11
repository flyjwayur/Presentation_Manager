import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { TableCell } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import Pageview from '@material-ui/icons/Pageview';
import BorderColor from '@material-ui/icons/BorderColor';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const styles = theme => ({
  tableCell: {
    backgroundColor: theme.palette.secondary.main,
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

const CustumTableCell = withStyles(theme => ({
  body: {
    fontSize: 15,
  },
}))(TableCell);

class Presentation extends Component {
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
      <Fragment>
        <CustumTableCell
          className={classes.tableCell}
          component='th'
          scope='row'
        >
          {presenter}
        </CustumTableCell>
        <CustumTableCell align='right'>{evaluator}</CustumTableCell>
        <CustumTableCell align='right'>{topic}</CustumTableCell>
        <CustumTableCell align='right'>{article}</CustumTableCell>
        <CustumTableCell align='center'>
          {moment(date).format('YYYY-MM-DD')}
        </CustumTableCell>
        <CustumTableCell align='center'>
          <Link to={`/presentations/${_id}`} style={{ textDecoration: 'none' }}>
            <Pageview
              className={classNames(classes.viewIcon, classes.viewIconHover)}
            />
          </Link>
          <BorderColor
            className={classNames(classes.editIcon, classes.editIconHover)}
            onClick={this.handleEdit}
          />
          <DeleteForeverOutlinedIcon
            className={classNames(classes.deleteIcon, classes.deleteIconHover)}
            onClick={this.handleDelete}
          />
        </CustumTableCell>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Presentation);
