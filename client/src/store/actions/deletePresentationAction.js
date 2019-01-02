import axios from "axios";
import { DELETE_PRESENTATION, ERROR_MESSAGE } from "./actionTypes";

export const deletePresentation = (selectedPresentation, id) => {
  return async dispatch => {
    try {
      const response = await axios.delete(
        `/presentations/${id}`,
        selectedPresentation
      );
      const deletedPresentation = response.data;
      console.log("deleted Presentation", deletedPresentation);
      dispatch({
        type: DELETE_PRESENTATION,
        payload: deletedPresentation,
        id
      });
    } catch (err) {
      const error = err.response.data.message
      ? err.response.data.message
      : err.response.data;
      dispatch({
        type: ERROR_MESSAGE,
        payload: error
      });
    }
  };
};
