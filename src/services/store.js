import {
  routerMiddleware,
  routerReducer
} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import combineReducers from 'redux/src/combineReducers';
import { reducer as randomReducer } from '../scenes/Random/services/reducer';
import { reducer as homeReducer } from '../scenes/Home/services/reducer';
import { reducer as loginReducer } from '../scenes/Login/services/reducer';
import { reducer as mainReducer } from '../main/services/reducer';
import { reducer as favouritesReducer } from '../scenes/Favourites/services/reducer';
import {
  combineEpics,
  createEpicMiddleware
} from 'redux-observable';
import randomEpic from '../scenes/Random/services/epics';
import homeEpic from '../scenes/Home/services/epics';
import authEpic from '../scenes/Login/services/epics';
import mainEpic from '../main/services/epics';
import apiAuth from './auth.service';
import apiGiphy from './giphy.service';
import {
  loadingBarMiddleware,
  loadingBarReducer
} from 'react-redux-loading-bar';


export const createAppStore = (history) => {
  const routerHistoryMiddleware = routerMiddleware(history);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;

  const rootEpic = combineEpics(
    randomEpic,
    homeEpic,
    authEpic,
    mainEpic
  );

  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
      apiAuth,
      apiGiphy,
    }
  });

  const rootReducer = combineReducers({
    router: routerReducer,
    random: randomReducer,
    home: homeReducer,
    auth: loginReducer,
    main: mainReducer,
    favourites: favouritesReducer,
    loadingBar: loadingBarReducer,
  });

  return createStore(
    // creating a global reducer for an app with combineReducers
    rootReducer,

    composeEnhancers(
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        promiseMiddleware(), // resolves promises
        loadingBarMiddleware(), // manages loading bar
        createLogger(), // log actions in console
        routerHistoryMiddleware, // manage navigation history
        epicMiddleware,
      )
    )
  );
};

