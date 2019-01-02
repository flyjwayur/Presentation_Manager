import axios from 'axios';
import { ADD_PRESENTATION, ERROR_MESSAGE } from './actionTypes';

export const addPresentation = newPresentation => {
  return async(dispatch) => {
    try {
      const response = await axios.post("/presentations", newPresentation);
      const addedPresentation = response.data.newPresentation;

      dispatch({
        type: ADD_PRESENTATION,
        payload : addedPresentation
      })
    }catch(err){
      console.log('err from BE', err.response);
      const error = err.response.data.title
        ? err.response.data.title
        : err.response.data;
      dispatch({
        type: ERROR_MESSAGE,
        payload: error
      });
    }
  } 
}
