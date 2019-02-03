import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';

const styles = theme => ({
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
});

const TextInputField = props => {
  const {
    name,
    label,
    placeholder,
    value,
    type,
    onChange,
    variant,
    id,
    onBlur,
    required,
    info,
    feedbackMessages,
    errors,
    classes,
  } = props;
  console.log(props);
  return (
    <Fragment>
      {required ? (
        <TextField
          required
          InputLabelProps={{
            shrink: true,
            root: classes.cssLabel,
          }}
          InputProps={{
            root: classes.cssOutlinedInput,
          }}
          label={label}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          variant={variant}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          className={classes.textField}
        />
      ) : (
        <TextField
          InputLabelProps={{
            shrink: true,
            root: classes.cssLabel,
          }}
          InputProps={{
            root: classes.cssOutlinedInput,
          }}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          variant={variant}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          className={classes.textField}
        />
      )}
      {feedbackMessages || errors ? null : info && <small>{info}</small>}
      {errors
        ? errors && <small style={{ color: 'red' }}>{errors}</small>
        : feedbackMessages && (
            <small style={{ color: 'red' }}>{feedbackMessages}</small>
          )}
    </Fragment>
  );
};

export default withStyles(styles)(TextInputField);
