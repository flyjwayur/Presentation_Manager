import axios from "axios";
import {
  ADD_PRESENTATION,
  VALIDATION_ERROR_MESSAGE
} from "./actionTypes";

export const addPresentation = (newPresentation, history) => {
  return async dispatch => {
    try {
      const response = await axios.post("/api/presentations", newPresentation);

      const addedPresentation = response.data.newPresentation;
      dispatch({
        type: ADD_PRESENTATION,
        payload: addedPresentation
      });

      console.log('success');
    } catch (error) {
      console.log("lets handle error");

      const validErrors = error.response ? error.response.data.errors : {};
      console.log('error action', validErrors);
      dispatch({
        type: VALIDATION_ERROR_MESSAGE,
        payload: validErrors
      });
    }
  };
};
