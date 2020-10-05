import reducer from '../src/reducers/ContactsRedux';
import {INITIAL_STATE} from '../src/reducers/ContactsRedux';
import {contacts} from '../jsonMockUp';
import * as types from '../src/actions/types';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual({
      contacts: [],
      persistedContacts: [],
    });
  });

  it('should add contact', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.SET_CONTACTS,
        payload: contacts,
      }),
    ).toEqual({
      contacts: contacts,
      persistedContacts: [],
    });
  });

  it('should update contacts', () => {
    expect(
        reducer(INITIAL_STATE, {
          type: types.UPDATE_CONTACTS,
          payload: contacts,
        }),
      ).toEqual({
        contacts: contacts,
        persistedContacts: contacts,
      });
  });
});
