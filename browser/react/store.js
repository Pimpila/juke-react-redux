import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/root-reducer';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


const logger = createLogger();
const middleware = applyMiddleware(logger, thunkMiddleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(middleware));
