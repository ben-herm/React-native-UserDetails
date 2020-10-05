import {combineReducers} from 'redux'
import storage from '@react-native-community/async-storage'
import {persistReducer} from 'redux-persist'
import ContactsReducer from './ContactsRedux'


const favoritesReducerConfig = {
  key: 'ContactsReducer',
  blacklist: ['contacts'],
  storage,
}

const reducers = {
  ContactsReducer: persistReducer(favoritesReducerConfig, ContactsReducer),
}

const appReducer = combineReducers(reducers)
export default appReducer
