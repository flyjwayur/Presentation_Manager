import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, SvgIcon } from '@material-ui/core';
import classNames from 'classnames';
import PlayCircleOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import { PresentationImage } from '../../components/UI/Icon/Icon';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  greeting: {
    textAlign: 'left',
    margin: theme.spacing.unit * 3,
  },
  message: {
    textAlign: 'left',
    margin: theme.spacing.unit * 3,
    color: theme.palette.primary.darker,
    fontWeight: 900,
  },
  paper: {
    padding: theme.spacing.unit * 5,
    backgroundColor: theme.palette.secondary.main,
  },
  paperHover: {
    '&:hover': {
      //backgroundColor: theme.palette.third.light
    },
  },
  icon: {
    fontSize: 100,
    color: theme.palette.third.dark,
  },
  iconHover: {
    '&:hover': {
      color: theme.palette.third.light,
    },
  },
  link: {
    textDecoration: 'none',
  },
  iconMessageWrapper: {
    display: 'flex',
    marginTop: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 10,
  },
  messagesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 10,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 10,
      marginLeft: theme.spacing.unit * 3,
    },
  },
  introImage: {
    width: '200px',
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
    </SvgIcon>
  );
}

const HomePage = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Link to='/presentations' className={classes.link}>
        <Paper className={classNames(classes.paper, classes.paperHover)}>
          <Grid container justify='center' className={classes.container}>
            <Grid item xs={12}>
              <HomeIcon
                className={classes.icon}
                color='primary'
                component={svgProps => (
                  <svg {...svgProps}>
                    <defs>
                      <linearGradient id='gradient1'>
                        <stop offset='30%' stopColor='#FBE8A6' />
                        <stop offset='90%' stopColor='#303C6C' />
                      </linearGradient>
                    </defs>
                    {React.cloneElement(svgProps.children[0], {
                      fill: 'url(#gradient1)',
                    })}
                  </svg>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className={classes.iconMessageWrapper}>
                <PlayCircleOutlinedIcon
                  className={classNames(classes.icon, classes.iconHover)}
                />
                <Typography variant='h4' className={classes.greeting}>
                  Hei, HyeSoo
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className={classes.messagesWrapper}>
                <Typography variant='h5' className={classes.message}>
                  Awesome Talks, Awesome Speakers !
                </Typography>
                <Typography variant='h5' className={classes.message}>
                  Would you like to check presentations ?
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <PresentationImage className={classes.introImage} />
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </div>
  );
};

export default withStyles(styles)(HomePage);
