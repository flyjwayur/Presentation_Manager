import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  SvgIcon,
} from '@material-ui/core';
import FeaturedPlayList from '@material-ui/icons/FeaturedPlayList';
import GridOn from '@material-ui/icons/GridOn';
import classes from './navigation.module.css';
import classNames from 'classnames';
import SubscribeDialog from '../UI/Dialogs/Dialogs';
import auth from '../../authentication/auth';
import setAuthToken from '../../authentication/setAuthToken';

const styles = theme => ({
  homeIcon: {
    width: theme.spacing.unit * 9,
    color: theme.palette.third.dark,
    margin: theme.spacing.unit * 5,
  },
  homeIconHover: {
    '&:hover': {
      color: theme.palette.third.light,
      border: '1px solid #fff',
    },
  },
  button: {
    margin: theme.spacing.unit * 5,
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
    </SvgIcon>
  );
}

class Navigation extends Component {
  signOut = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      auth.signout(() => this.props.history.push('/'));
      setAuthToken(false);
    }
  };
  render() {
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar color='inherit'>
            <IconButton color='inherit' aria-label='menu icon'>
              <NavLink
                to='/'
                className={classNames(classes.nav__logo, classes.nav_links)}
              >
                <FeaturedPlayList />
              </NavLink>
            </IconButton>
            <Typography
              variant='h6'
              color='inherit'
              className={classes.nav__title}
              align='left'
            >
              Presentation Manager
            </Typography>
            <NavLink
              to='/'
              activeStyle={{
                textDecoration: 'none',
              }}
            >
              <IconButton>
                <HomeIcon
                  className={classNames(
                    classes.homeIcon,
                    classes.homeIconHover,
                  )}
                  color='primary'
                  component={svgProps => (
                    <svg {...svgProps}>
                      <defs>
                        <linearGradient id='gradient1'>
                          <stop offset='30%' stopColor='#FBE8A6' />
                          <stop offset='40%' stopColor='#303C6C' />
                        </linearGradient>
                      </defs>
                      {React.cloneElement(svgProps.children[0], {
                        fill: 'url(#gradient1)',
                      })}
                    </svg>
                  )}
                />
              </IconButton>
            </NavLink>
            <NavLink to='/presentations' className={classes.nav_links}>
              <IconButton>
                <GridOn />
              </IconButton>
            </NavLink>
            <SubscribeDialog />
            {auth.isAuthenticated ? (
              <Button
                variant='outlined'
                color='default'
                style={{ marginRight: '1em' }}
                onClick={this.signOut}
              >
                Sign Out
              </Button>
            ) : (
              <>
                <NavLink to='/signUp' className={classes.nav_links}>
                  <Button
                    variant='outlined'
                    color='default'
                    style={{ marginRight: '1em' }}
                  >
                    Sign Up
                  </Button>
                </NavLink>
                <NavLink to='/signIn' className={classes.nav_links}>
                  <Button
                    variant='outlined'
                    color='default'
                    className={classes.button}
                  >
                    Sign In
                  </Button>
                </NavLink>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Navigation));
