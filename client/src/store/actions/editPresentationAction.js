import axios from 'axios';
import { EDIT_PRESENTATION, ERROR_MESSAGE } from './actionTypes';


export const editPresentation = (selectedPresentation, id) => {

  return async(dispatch) => {
    try{
      const response = await axios.put(
        `/api/presentations/${id}`,
        selectedPresentation
      );
      const edittedPresentation = response.data.edittedPresentation;
      dispatch({
        type: EDIT_PRESENTATION,
        payload: edittedPresentation,
        id
      })
    }catch(err){
      const error = err.response.data.message
        ? err.response.data.message
        : err.response.data;
      dispatch({
        type: ERROR_MESSAGE,
        payload: error
      });
    }
  }
}
