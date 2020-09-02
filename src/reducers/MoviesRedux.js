// @flow

import * as types from '../actions/types'

const INITIAL_STATE = {
  movies: null,
  favorites: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_POPULAR_MOVIES:
      return {...state, movies: action.payload.results}
    case types.ADD_FAVORITE_MOVIE:
      return {...state, favorites: [...state.favorites, action.payload]}
    case types.DELETE_FAVORITE_MOVIE:
      return {...state, favorites: action.payload}

    default:
      return state
  }
}
