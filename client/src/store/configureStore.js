import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import presentationReducer from './reducers/presentationReducer';

const AllEnhancers = compose(applyMiddleware(thunk),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const ConfigureStore = () => {
  const store = createStore(presentationReducer, AllEnhancers);
  return store;
};

