import React, { Fragment } from "react";
import { TextField } from "@material-ui/core";

export const InputInDialogs = ({
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
  errors
}) => {
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
        />
      )}
      {info && <small>{info}</small>}
      {errors && (
        <small style={{ color: "red" }}> {errors[name]} </small>
      )}
    </Fragment>
  );
};
