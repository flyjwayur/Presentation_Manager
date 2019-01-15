import {
  FETCH_PRESENTATIONS_BEGIN,
  FETCH_PRESENTATIONS_SUCCESS,
  FETCH_PRESENTATIONS_FAILURE,
  ADD_PRESENTATION,
  EDIT_PRESENTATION,
  DELETE_PRESENTATION,
  ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from "../actions/actionTypes";

const initialState = {
  presentations: [],
  error: false,
  isLoading: false,
  validationErrorMessage : {}
};

const presentationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRESENTATIONS_BEGIN:
      return { ...state, isLoading: true };
    case FETCH_PRESENTATIONS_SUCCESS:
      return { ...state, presentations: action.payload, isLoading: false };
    case FETCH_PRESENTATIONS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case ADD_PRESENTATION:
      return {
        ...state,
        presentations: [...state.presentations, action.payload],
        isLoading: false
      };
    case EDIT_PRESENTATION:
      const presentationsAfterEdit = state.presentations.map(presentation => {
        if (presentation._id === action.id) {
          return action.payload;
        } else {
          return presentation;
        }
      });
      return {
        ...state,
        presentations: presentationsAfterEdit
      };
    case DELETE_PRESENTATION:
      const presentationId = action.id;
      const indexOfPresentation = state.presentations.findIndex(
        presentation => presentation._id === presentationId
      );
      // const presentationsAfterDelete = state.presentations.filter(presentation => {
      //   return presentation._id !== action.id;
      // });
      console.log({
        ...state,
        presentations: [
          ...state.presentations.slice(0, indexOfPresentation),
          ...state.presentations.slice(
            indexOfPresentation + 1,
            state.presentations.length
          )
        ]
      });
      return {
        ...state,
        presentations: [
          ...state.presentations.slice(0, indexOfPresentation),
          ...state.presentations.slice(
            indexOfPresentation + 1,
            state.presentations.length
          )
        ]
      };
    case ERROR_MESSAGE:
      return { ...state, error: action.payload };
    case VALIDATION_ERROR_MESSAGE:
      console.log('state in reducer', { ...state,  validationErrorMessage : action.payload});
      console.log('validation msg from server', action.payload)
      return { ...state,  validationErrorMessage : action.payload};
    default:
      return state;
  }
};

export default presentationReducer;
