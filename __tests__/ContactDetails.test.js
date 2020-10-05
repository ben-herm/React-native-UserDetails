
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



// test('form submits two answers', () => {
//     const mockFn = jest.fn();
  
//     const answerInputs = getAllByA11yLabel('answer input');
  
//     fireEvent.changeText(answerInputs[0], 'a1');
//     fireEvent.changeText(answerInputs[1], 'a2');
//     fireEvent.press(getByText('Submit'));
  
//     expect(mockFn).toBeCalledWith({
//       '1': { q: 'q1', a: 'a1' },
//       '2': { q: 'q2', a: 'a2' },
//     });
//   });