import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/root-reducer';
import {createLogger} from 'redux-logger';


const logger = createLogger();
const Middleware = applyMiddleware(logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(Middleware));
