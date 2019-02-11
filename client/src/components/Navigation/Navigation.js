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
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Hidden,
  Drawer,
} from '@material-ui/core';
import FeaturedPlayList from '@material-ui/icons/FeaturedPlayList';
import GridOn from '@material-ui/icons/GridOn';
import Menu from '@material-ui/icons/Menu';
import classNames from 'classnames';
// import classes from './navigation.module.css';
import SubscribeDialog from '../UI/Dialogs/Dialogs';
import auth from '../../authentication/auth';
import setAuthToken from '../../authentication/setAuthToken';
import PropTypes from 'prop-types';

const drawerWidth = 250;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: theme.palette.primary.darker,
  },
  nav__brand: {
    flexGrow: 1,
  },
  nav__title: {
    flexGrow: 1,
    color: theme.palette.secondary.light,
  },
  nav__links: {
    display: 'flex',
    textDecoration: 'none',
  },
  menuButton: {
    color: theme.palette.secondary.light,
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  nav__signUpInOutDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  nav__signUpInOutMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  avatar: {
    width: '25px',
    borderRadius: '50%',
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
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  signOut = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      auth.signout(() => this.props.history.push('/'));
      setAuthToken(false);
    }
  };

  render() {
    const { classes } = this.props;
    const { isAuthenticated, user } = auth;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button>
            <NavLink to='/' className={classes.nav__links}>
              <ListItemIcon>
                <HomeIcon
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
              </ListItemIcon>
              <ListItemText primary='Home' />
            </NavLink>
          </ListItem>
          <Divider />
          <ListItem button>
            <NavLink to='/presentations' className={classes.nav__links}>
              <ListItemIcon>
                <GridOn />
              </ListItemIcon>
              <ListItemText primary='Presentations' />
            </NavLink>
          </ListItem>
          <Divider />
          <ListItem button>
            <NavLink
              to='presentations/addPresentation'
              className={classes.nav__links}
            >
              <ListItemIcon>
                <FeaturedPlayList />
              </ListItemIcon>
              <ListItemText primary='Add presentation' />
            </NavLink>
          </ListItem>
          <Divider />
          <SubscribeDialog />
          {isAuthenticated ? (
            <>
              <Divider className={classes.nav__signUpInOutMobile} />
              <ListItem
                button
                onClick={this.signOut}
                className={classes.nav__signUpInOutMobile}
              >
                <ListItemText primary='Sign Out' />
              </ListItem>
            </>
          ) : (
            <>
              <Divider className={classes.nav__signUpInOutMobile} />
              <ListItem button>
                <NavLink
                  to='/signUp'
                  className={classNames(
                    classes.nav__signUpInOutMobile,
                    classes.nav__links,
                  )}
                >
                  <ListItemText primary='Sign Up' />
                </NavLink>
              </ListItem>
              <Divider />
              <ListItem button>
                <NavLink
                  to='/signIn'
                  className={classNames(
                    classes.nav__signUpInOutMobile,
                    classes.nav__links,
                  )}
                >
                  <ListItemText primary='Sign In' />
                </NavLink>
              </ListItem>
            </>
          )}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <div className={classes.nav__brand}>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <Menu />
              </IconButton>
              <NavLink to='/' className={classes.nav__links}>
                <Typography
                  variant='h6'
                  color='inherit'
                  className={classes.nav__title}
                  align='left'
                >
                  Presentation Manager
                </Typography>
              </NavLink>
            </div>
            {isAuthenticated ? (
              <>
                <IconButton>
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className={classes.avatar}
                  />
                </IconButton>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={this.signOut}
                  className={classes.nav__signUpInOutDesktop}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className={classes.nav__signUpInOutDesktop}>
                <NavLink to='/signUp' className={classes.nav__links}>
                  <Button
                    variant='outlined'
                    color='primary'
                    style={{ marginRight: '10px' }}
                  >
                    Sign Up
                  </Button>
                </NavLink>
                <NavLink to='/signIn' className={classes.nav__links}>
                  <Button variant='outlined' color='primary'>
                    Sign In
                  </Button>
                </NavLink>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* temporary drawer is shown for small screens */}
          <Hidden smUp implementation='css'>
            <Drawer
              variant='temporary'
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          {/* permanent drawer is shown for wider screens. */}
          <Hidden xsDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant='permanent'
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Navigation));
