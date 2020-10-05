import {createStore, applyMiddleware, compose} from 'redux'
import Reactotron from '../utils/ReactotronConfig'

// create the store
export default rootReducer => {
const store = createStore(rootReducer)

  return store
}
