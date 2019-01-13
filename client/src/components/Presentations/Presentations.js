import React, { Component, Fragment } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import Presentation from "../../components/Presentation/Presentation";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import FormDialog from "../UI/Dialogs/Dialogs"

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    margin: theme.spacing.unit * 5,
    overFlowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableHead: {
    backgroundColor: theme.palette.secondary.main
  },
  hightlightText: {
    color: theme.palette.secondary.dark,
    fontWeight: 900
  },
  iconPosition: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing.unit * 5
  },
  goBackButton: {
    flex: 2
  },
  fab: {
    backgroundColor: theme.palette.secondary.light
  },
  addIcon: {
    fontSize: 60,
    flex: 1
  }
});

const CustumTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.third.dark,
    fontSize: 14,
    fontWeight: 800
  }
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

  render() {
    const { isLoading, error, presentations, classes } = this.props;

    return (
      <Fragment>
        <div className={classes.iconPosition}>
          <Link
            to="/"
            style={{
              textDecoration: "none"
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              className={classes.goBackButton}
            >
              Go Back
            </Button>
          </Link>
          {/* <Link
            to="presentations/addPresentation"
            style={{
              textDecoration: "none"
            }}
          > */}
            <FormDialog onAddPresentation={this.props.onAddPresentation} validFromServer={this.props.validFromServer} classes={this.props.classes}/>
          {/* </Link> */}
        </div>
        <div className={classes.root}>
          <Typography variant="h6" color="primary">
            Upcoming presentations :{" "}
            <span className={classes.hightlightText}>
              {presentations.length}
            </span>
          </Typography>
          {/* Handle errors */}
          {error && (
            <div>
              <Typography color="secondary">{error}</Typography>
              <Typography color="secondary">
                Could you refresh the page?
              </Typography>
            </div>
          )}
          {/* Handle loading presentation data */}
          {isLoading && <Spinner />}
          {/* Render presentations */}
          <div>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustumTableCell>Presentor</CustumTableCell>
                    <CustumTableCell align="right">Evaluator</CustumTableCell>
                    <CustumTableCell align="right">Topic</CustumTableCell>
                    <CustumTableCell align="right">Article</CustumTableCell>
                    <CustumTableCell align="center">Date</CustumTableCell>
                    <CustumTableCell align="center">Monitor</CustumTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderPresentations(this.props)}</TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </Fragment>
    );
  }
}

Presentations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Presentations);
