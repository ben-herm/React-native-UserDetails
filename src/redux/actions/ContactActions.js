import * as types from './types'

export const setContacts = payload => ({
  type: types.SET_CONTACTS,
  payload,
})

export const updateContacts = payload => ({
  type: types.UPDATE_CONTACTS,
  payload,
})

