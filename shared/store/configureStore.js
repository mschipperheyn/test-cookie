import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import config from '../../config';

import rootReducer from './reducers';

export default function configureStore(initialState) {
  let enhancer;
  const middlewares = [];
  middlewares.push(thunkMiddleware);

  /* if (config('analytics').active) {
    const googleAnalyticsMiddleware = require('../middleware/gaMiddleware');
    middlewares.push(googleAnalyticsMiddleware);
  } */
  // In production adding only thunk middleware
  const middleware = applyMiddleware(...middlewares);

  const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  enhancer = composeEnhancers(middleware);

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(require('./reducers').default));
  }

  return store;
}
