import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main,
  },
});

function CenteredGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);
