import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  SvgIcon
} from "@material-ui/core";
import FeaturedPlayList from "@material-ui/icons/FeaturedPlayList";
import GridOn from "@material-ui/icons/GridOn";
import classes from "./navigation.module.css";
import classNames from "classnames";

const styles = theme => ({
  homeIcon: {
    width: theme.spacing.unit * 9,
    color: theme.palette.third.dark,
    position: "relative",
    margin: theme.spacing.unit * 5
  },
  homeIconHover: {
    "&:hover": {
      color: theme.palette.third.light,
      border: "1px solid #fff"
    }
  }
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class Navigation extends Component {
  render() {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar color="inherit">
            <IconButton color="inherit" aria-label="menu icon">
              <NavLink
                to="/"
                className={classes.logoColor}
                activeStyle={{
                  textDecoration: "none"
                }}
              >
                <FeaturedPlayList />
              </NavLink>
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.typoFlex}
              align="left"
            >
              <NavLink
                to="/"
                className={classes.titleColor}
                activeStyle={{
                  textDecoration: "none"
                }}
              >
                Presentations
              </NavLink>
            </Typography>
            <NavLink
              to="/"
              activeStyle={{
                textDecoration: "none"
              }}
            >
              <IconButton>
                <HomeIcon
                  className={classNames(
                    classes.homeIcon,
                    classes.homeIconHover
                  )}
                  color="primary"
                  component={svgProps => (
                    <svg {...svgProps}>
                      <defs>
                        <linearGradient id="gradient1">
                          <stop offset="30%" stopColor="#FBE8A6" />
                          <stop offset="40%" stopColor="#303C6C" />
                        </linearGradient>
                      </defs>
                      {React.cloneElement(svgProps.children[0], {
                        fill: "url(#gradient1)"
                      })}
                    </svg>
                  )}
                />
              </IconButton>
            </NavLink>

            <NavLink
              to="/presentations"
              activeStyle={{
                textDecoration: "none"
              }}
            >
              <IconButton>
                <GridOn />
              </IconButton>
            </NavLink>
            <Button color="inherit">Login</Button>
            {/* 
              <NavLink
                to="/presentations"
                activeStyle={{
                  fontWeight: "bold",
                  color: "primary",
                  textDecoration: "none"
                }}
              >
                Presentations
              </NavLink>
            </Typography>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <NavLink
                to="/presentations/addPresentation"
                activeStyle={{
                  fontWeight: "bold",
                  color: "brown",
                  textDecoration: "none"
                }}
              >
                Add Presentations
              </NavLink> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
