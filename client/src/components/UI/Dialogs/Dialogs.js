import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
} from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  emailIcon: {
    backgroundColor: theme.palette.secondary.light,
  },
});

function FormDialog() {
  //Hook - use state and other React features without writing class
  //useState hook: let us add React state to function components
  const [open, setOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    //Submit email to subscribe updated news
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = e => {
    setOpen(false);
  };

  return (
    <div>
      {/* Email icon to open subscribe this website*/}
      <IconButton>
        <Email onClick={handleClickOpen} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(FormDialog);
