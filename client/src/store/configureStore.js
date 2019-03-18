import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import presentationReducer from './reducers/presentationReducer';

const composeEnhancers =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const ConfigureStore = () => {
  const store = createStore(presentationReducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
