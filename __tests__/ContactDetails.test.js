
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import  ContactDetails  from '../src/components/main/screens/ContactDetails';
import {singleContact} from '../jsonMockUp'
import {useSelector, useDispatch} from 'react-redux'
import {store, persistor} from '../src/redux/'
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'

const mockSetState = jest.fn();

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useState: jest.fn()
  }));


describe('renders correctly', () => {
it('renders correctly', () => {
    renderer.create(<ContactDetails route={{params:{contact:singleContact}}} />);
  });
  
  });
