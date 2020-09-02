import {combineReducers} from 'redux'
import storage from '@react-native-community/async-storage'
import {persistReducer} from 'redux-persist'
import MovieReducer from './MoviesRedux'

//set up persist config for movies reducer backlisting the movie paramater.

const favoritesReducerConfig = {
  key: 'MoviesReducer',
  blacklist: ['movies'],
  storage,
}

const reducers = {
  MovieReducer: persistReducer(favoritesReducerConfig, MovieReducer),
}

const appReducer = combineReducers(reducers)
export default appReducer
