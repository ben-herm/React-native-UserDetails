import {createStore, applyMiddleware, compose} from 'redux'
import Reactotron from '../utils/ReactotronConfig'

// create the store
export default rootReducer => {
  const config = {
    useFixtures: false,
    ezLogin: false,
    yellowBox: __DEV__,
    reduxLogging: __DEV__,
    includeExamples: __DEV__,
    useReactotron: false,
  }
  const store = createStore(rootReducer, Reactotron.createEnhancer())

  return store
}
