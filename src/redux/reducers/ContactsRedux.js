// @flow

import * as types from '../actions/types'
import { PURGE } from 'redux-persist';

export const INITIAL_STATE = {
  contacts: [],
  persistedContacts: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_CONTACTS:
      return {...state, contacts: action.payload, }
      case types.UPDATE_CONTACTS:
        return {...state, persistedContacts: action.payload, contacts: action.payload}
      case PURGE: 
      return {...INITIAL_STATE};    // Return the initial state of this reducer to 'reset' the app 
    default:
      return state
  }
}
