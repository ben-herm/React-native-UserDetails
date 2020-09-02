import * as types from '../actions/types'

export const setPopularMovies = payload => ({
  type: types.SET_POPULAR_MOVIES,
  payload,
})

export const addToFavorites = payload => ({
  type: types.ADD_FAVORITE_MOVIE,
  payload,
})

export const deleteFromFavorites = payload => ({
  type: types.DELETE_FAVORITE_MOVIE,
  payload,
})
