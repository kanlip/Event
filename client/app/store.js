import { createStore, applyMiddleware, compose } from 'redux';
import {AUTH_USER,AUTH_NAME,AUTH_ROLE} from './actions/types';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const initialState = {};
const middleware = [thunk];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      name: 'MyApp', actionsBlacklist: ['REDUX_STORAGE_SAVE']
    }) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);
const store = createStore(
  rootReducer,
  initialState,
  enhancer
);
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER })
}
const name = localStorage.getItem('name');
if(name){
  store.dispatch({type:AUTH_NAME,payload:name})
}
const role = localStorage.getItem('role');
if(role){
  store.dispatch({type:AUTH_ROLE,payload:role})
}
export default store;