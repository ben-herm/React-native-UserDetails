import {combineReducers} from 'redux'
import configureStore from './CreateStore'
import rootReducer from '../reducers/index'
import {persistStore} from 'redux-persist'

//configre reducers for store and persistor for persist storage.

let finalReducers = rootReducer
export const store = configureStore(finalReducers)
export const persistor = persistStore(store)
