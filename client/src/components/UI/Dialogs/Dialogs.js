import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab
} from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  fab: {
    backgroundColor: theme.palette.secondary.light
  },
  addIcon: {
    fontSize: 60,
    flex: 1
  }
});

function FormDialog({ onAddPresentation, validFromServer }) {
  //Hook - use state and other React features without writing class
  //useState hook: let us add React state to function components
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    presenter: "",
    evaluator: "",
    topic: "",
    article: "",
    date: "",
    keywords: "",
    summary: ""
  });

  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!values) return;
    onAddPresentation(values, validFromServer);
    setOpen(false);
  };
  // const [touched] = React.useState({
  //   presenter: false,
  //   evaluator: false,
  //   topic: false,
  //   article: false,
  //   date: false
  // });

  // const handleInputsChange = (e) => {
  //   console.log('e', e);
  //   presenter({presenter : e.target.value})
  // };

  // const handleSubmit = e => {
  //   console.log("handleSubmit");
  //   e.preventDefault();

  //   // When 'onAddPresentation' gets called,
  //   // if there is error, clients gets error from 'SERVER' in addPresentation action
  //   // And it displays the all error messages for input fields hints
  //   const newPresentation = this.state;

  //   console.log("before : validFromServer", this.props.validFromServer);
  //   this.props
  //     .onAddPresentation(newPresentation, this.props.history)
  //     .then(() => {
  //       if (this.props.validFromServer) {
  //         this.props.history.push("/presentations");
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };

  // useEffect(() => {

  // })

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      {/* className={this.props.classes.fab} */}
      <Fab onClick={handleClickOpen}>
        <AddCircle
          color="secondary"
          arial-label="Add"
          //className={this.props.classes.addIcon}
        />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add presentation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add presentations, please enter inforamtion as below.
          </DialogContentText>
          <TextField
            autoFocus
            label="presenter"
            variant="filled"
            type="text"
            id="presenter"
            name="presenter"
            onChange={handleChange}
            value={values.presenter}
            // onBlur={props.handleBlur}
            margin="dense"
            fullWidth
            required
          />
          <TextField
            autoFocus
            label="evaluator"
            variant="filled"
            type="text"
            id="evaluator"
            name="evaluator"
            onChange={handleChange}
            value={values.evaluator}
            // onBlur={props.handleBlur}
            margin="dense"
            fullWidth
            required
          />
          <TextField
            autoFocus
            label="topic"
            variant="filled"
            type="text"
            id="topic"
            name="topic"
            onChange={handleChange}
            value={values.topic}
            // onBlur={props.handleBlur}
            margin="dense"
            fullWidth
            required
          />
          <TextField
            autoFocus
            label="article"
            variant="filled"
            type="url"
            id="article"
            name="article"
            onChange={handleChange}
            value={values.article}
            // onBlur={props.handleBlur}
            margin="dense"
            fullWidth
            required
          />
          <TextField
            autoFocus
            label="date"
            variant="filled"
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            value={values.date}
            // onBlur={props.handleBlur}
            margin="dense"
            fullWidth
            required
          />
          <TextField
            autoFocus
            label="keywords"
            variant="filled"
            type="text"
            id="keywords"
            name="keywords"
            onChange={handleChange}
            value={values.keywords}
            // onChange={props.handleInputsChange}
            // onBlur={props.handleBlur}
            margin="dense"
            fullWidth
            required
          />
          <TextField
            autoFocus
            label="summary"
            variant="filled"
            type="text"
            id="summary"
            name="summary"
            onChange={handleChange}
            value={values.summary}
            // onBlur={props.handleBlur}
            margin="dense"
            fullWidth
            multiline
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(withRouter(FormDialog));
