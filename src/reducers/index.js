import {combineReducers} from 'redux'
import storage from '@react-native-community/async-storage'
import {persistReducer} from 'redux-persist'
import createSensitiveStorage from 'redux-persist-sensitive-storage'
import MovieReducer from './MoviesRedux'

const favoritesReducerConfig = {
  key: 'MoviesReducer',
  blacklist: ['movies'],
  storage,
}

const reducers = {
  MovieReducer: persistReducer(favoritesReducerConfig, MovieReducer),
}

const appReducer = combineReducers(reducers)

// const appReducer = combineReducers(reducers)
export default appReducer
