import React, { Component, Fragment } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import Presentation from '../../components/Presentation/Presentation';
import PresenationCard from '../../components/PresentationCard/PresenationCard';
import { Link } from 'react-router-dom';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  Fab,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import AddCircle from '@material-ui/icons/AddCircle';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    margin: theme.spacing.unit * 5,
    overFlowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableHead: {
    backgroundColor: theme.palette.secondary.main,
  },
  gridRoot: {
    flexGrow: 1,
  },
  hightlightText: {
    color: theme.palette.secondary.dark,
    fontWeight: 900,
  },
  iconPosition: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing.unit * 5,
  },
  goBackButton: {
    flex: 2,
  },
  fab: {
    backgroundColor: theme.palette.secondary.light,
  },
  addIcon: {
    fontSize: 60,
    flex: 1,
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.third.dark,
    fontSize: 17,
    fontWeight: 800,
  },
}))(TableCell);

class Presentations extends Component {
  renderPresentations = ({ match, history, presentations }) => {
    if (presentations.length > 0) {
      return presentations.map(presentation => {
        return (
          <TableRow key={presentation._id.toString()}>
            <Presentation
              presentation={presentation}
              match={match}
              history={history}
              deletePresentation={this.props.deletePresentation}
            />
          </TableRow>
        );
      });
    } else if (presentations.length === 0) {
      return (
        <TableRow>
          <TableCell>There are no presentations</TableCell>
        </TableRow>
      );
    } else {
      return null;
    }
  };

  renderPresentationsInSMscreen = ({ match, history, presentations }) => {
    if (presentations.length > 0) {
      return presentations.map(presentation => {
        return (
          <Grid item xs={12} sm={6} key={presentation._id.toString()}>
            <PresenationCard
              presentation={presentation}
              match={match}
              history={history}
              deletePresentation={this.props.deletePresentation}
            />
          </Grid>
        );
      });
    } else if (presentations.length === 0) {
      return (
        <Typography variant='subtitle1' gutterBottom color='secondary'>
          There are no presentations
        </Typography>
      );
    } else {
      return null;
    }
  };

  render() {
    const { isLoading, error, presentations, classes } = this.props;

    console.log(this.props.width);
    //Media query : if the screen size is smaller than sm, render cards
    if (isWidthDown('sm', this.props.width)) {
      return (
        <div className={classes.gridRoot}>
          <Grid container justify='center' spacing={8}>
            {this.renderPresentationsInSMscreen(this.props)}
          </Grid>
        </div>
      );
    }

    //Media query : if the screen size is bigger than sm, render table
    return (
      <Fragment>
        <div className={classes.iconPosition}>
          <Link
            to='/'
            style={{
              textDecoration: 'none',
            }}
          >
            <Button
              variant='outlined'
              color='primary'
              className={classes.goBackButton}
            >
              Go Back
            </Button>
          </Link>
          <Link
            to='presentations/addPresentation'
            style={{
              textDecoration: 'none',
            }}
          >
            <Fab className={classes.fab}>
              <AddCircle
                color='secondary'
                arial-label='Add'
                className={classes.addIcon}
              />
            </Fab>
          </Link>
        </div>
        <div className={classes.root}>
          <Typography variant='h6' color='primary'>
            Upcoming presentations :{' '}
            <span className={classes.hightlightText}>
              {presentations.length}
            </span>
          </Typography>
          {/* Handle errors */}
          {error && (
            <div>
              <Typography color='secondary' variant='subtitle1' gutterBottom>
                {error}
              </Typography>
              <Typography color='secondary' variant='h6' gutterBottom>
                Could you refresh the page?
              </Typography>
            </div>
          )}
          {/* Handle loading presentation data */}
          {isLoading && <Spinner />}
          {/* Render presentations */}
          <>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Presentor</CustomTableCell>
                    <CustomTableCell align='right'>Evaluator</CustomTableCell>
                    <CustomTableCell align='right'>Topic</CustomTableCell>
                    <CustomTableCell align='right'>Article</CustomTableCell>
                    <CustomTableCell align='center'>Date</CustomTableCell>
                    <CustomTableCell align='center'>Monitor</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderPresentations(this.props)}</TableBody>
              </Table>
            </Paper>
          </>
        </div>
      </Fragment>
    );
  }
}

Presentations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(Presentations);
