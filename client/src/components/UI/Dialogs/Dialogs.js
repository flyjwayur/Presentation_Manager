import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Email from '@material-ui/icons/Email';

//**** Give style with React Hook **** (It seems still testin)
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   dialogContentText: {
//     color: theme.palette.secondary.main,
//   },
// }));

const FormDialog = props => {
  //Hook - use state and other React features without writing class
  //useState hook: let us add React state to function components
  const [open, setOpen] = useState(false);
  // const classes = useStyles();

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
      <ListItem button>
        <ListItemIcon>
          <Email onClick={handleClickOpen} />
        </ListItemIcon>
        <ListItemText primary='Subscribe' onClick={handleClickOpen} />
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title' color='secondary'>
          Subscribe
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText className={classes.dialogContentText}> */}
          <DialogContentText color='textPrimary'>
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
            color='textPrimary'
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
};

export default FormDialog;
