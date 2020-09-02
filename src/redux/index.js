import {combineReducers} from 'redux'
// import { persistReducer } from "redux-persist";
import configureStore from './CreateStore'
import MoviesRedux from '../reducers/MoviesRedux'
import rootReducer from '../reducers/index'
import {persistStore} from 'redux-persist'
// import rootSaga from "../Sagas/";
// import ReduxPersist from "../Config/ReduxPersist";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  MoviesRedux,
})

let finalReducers = rootReducer
// If rehydration is on use persistReducer otherwise default combineReducers
//   if (ReduxPersist.active) {
//     const persistConfig = ReduxPersist.storeConfig;
//     finalReducers = persistReducer(persistConfig, reducers);
//   }

export const store = configureStore(finalReducers)
export const persistor = persistStore(store)
// if (module.hot) {
//   module.hot.accept(() => {
//     const nextRootReducer = require('./').reducers
//     store.replaceReducer(nextRootReducer)

//     //   const newYieldedSagas = require("../Sagas").default;
//     //   sagasManager.cancel();
//     //   sagasManager.done.then(() => {
//     //     sagasManager = sagaMiddleware(newYieldedSagas);
//     //   });
//   })
// }
