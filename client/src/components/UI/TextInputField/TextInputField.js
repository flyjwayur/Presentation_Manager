import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';

const TextInputField = ({
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
  style,
}) => {
  console.log('feedbackMessages', feedbackMessages);
  return (
    <Fragment>
      {required ? (
        <TextField
          required
          label={label}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          variant={variant}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          fullWidth
          className={style}
        />
      ) : (
        <TextField
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          variant={variant}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          fullWidth
          className={style}
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

export default TextInputField;
