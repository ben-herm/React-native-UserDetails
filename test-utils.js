// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ContactsReducer from './src/reducers/ContactsRedux'
// Import your own reducer

function render(
  ui,
  {
    initialState,
    store = createStore(ContactsReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// override render method
export { render }