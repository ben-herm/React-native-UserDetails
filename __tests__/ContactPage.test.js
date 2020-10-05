import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {render} from '@testing-library/react-native';
import {INITIAL_STATE} from '../src/reducers/ContactsRedux';
import {singleContact, contacts} from '../jsonMockUp';
import ContactPage from '../src/components/main/ContactsPage';
import {useSelector, useDispatch} from 'react-redux';
import renderer from 'react-test-renderer';
import ContactsRedux from '../src/reducers/ContactsRedux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useEffect: jest.fn(),
}));

describe('renders correctly', () => {
  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback({contacts:contacts, persistedContacts: contacts});
    });
  });
  afterEach(() => {
    useSelector.mockClear();
  });
  
  test('renders initial state', () => {
    // useSelector.mockImplementation((selector) =>
    //   selector({contacts:contacts, persistedContacts: contacts}),
    // );

    const {container} = render(<ContactPage />);
    expect(container).toMatchSnapshot();
  });
});
