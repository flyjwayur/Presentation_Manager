import axios from "axios";
import {
  FETCH_PRESENTATIONS_BEGIN,
  FETCH_PRESENTATIONS_SUCCESS,
  FETCH_PRESENTATIONS_FAILURE
} from "./actionTypes";


export const fetchFromDB = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_PRESENTATIONS_BEGIN
    });

    try {
      const url = "/presentations";
      const response = await axios.get(url);
      const presentations = response.data;
      dispatch({
        type: FETCH_PRESENTATIONS_SUCCESS,
        payload: presentations
      });
    } catch (err) {
      const error = err.response.data.message
        ? err.response.data.message
        : err.response.data;
      dispatch({
        type: FETCH_PRESENTATIONS_FAILURE,
        payload: error
      });
    }
  };
};
