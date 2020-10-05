import * as actions from '../src/actions/ContactActions';
import * as types from '../src/actions/types';
import {contacts} from '../jsonMockUp'

describe('actions', () => {
  it('should set Contacts', () => {
    const expectedAction = {
      type: types.SET_CONTACTS,
      payload: contacts,
    };
    expect(actions.setContacts(contacts)).toEqual(expectedAction);
  });

  it('should update Contacts', () => {
    const expectedAction = {
      type: types.UPDATE_CONTACTS,
      payload: contacts,
    };
    expect(actions.updateContacts(contacts)).toEqual(expectedAction);
  });
});
