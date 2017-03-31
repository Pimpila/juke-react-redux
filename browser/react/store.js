import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import lyricsReducer from './reducers/lyrics-reducer';
import playerReducer from './reducers/player-reducer';


const logger = createLogger();
const middleware = applyMiddleware(logger, thunkMiddleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const combined = combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer
});


export default createStore(combined, composeEnhancers(middleware));

