import axios from "axios";
import {
  ADD_PRESENTATION,
  VALIDATION_ERROR_MESSAGE,
  VALIDATION_FROM_SERVER
} from "./actionTypes";

export const addPresentation = (newPresentation, history) => {
  return async dispatch => {
    try {
      const response = await axios.post("/presentations", newPresentation);

      dispatch({
        type: VALIDATION_FROM_SERVER,
        valid: true
      });

      const addedPresentation = response.data.newPresentation;
      dispatch({
        type: ADD_PRESENTATION,
        payload: addedPresentation
      });

      console.log('success');
    } catch (error) {
      console.log("lets handle error");

      const validErrors = error.response ? error.response.data.errors : {};

      dispatch({
        type: VALIDATION_ERROR_MESSAGE,
        payload: validErrors
      });
    }
  };
};
