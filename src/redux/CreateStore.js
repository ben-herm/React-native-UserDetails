import {createStore, applyMiddleware, compose} from 'redux'
import Reactotron from '../utils/ReactotronConfig'
// import rootReducer from '../reducers'
// import Rehydration from '../Services/Rehydration'
// import ReduxPersist from '../Config/ReduxPersist'
// import createSagaMiddleware from 'redux-saga'
// import ScreenTracking from './ScreenTrackingMiddleware'
// import { appNavigatorMiddleware } from '../Navigation/ReduxNavigation'

// creates the store
export default rootReducer => {
  /* ------------- Redux Configuration ------------- */
  const config = {
    useFixtures: false,
    ezLogin: false,
    yellowBox: __DEV__,
    reduxLogging: __DEV__,
    includeExamples: __DEV__,
    useReactotron: false,
  }
  const middleware = []
  const enhancers = []

  /* ------------- Navigation Middleware ------------ */
  //   middleware.push(appNavigatorMiddleware)

  /* ------------- Saga Middleware ------------- */

  //   const sagaMonitor = config.useReactotron ? console.tron.createSagaMonitor() : null
  //   const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  //   middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  //   enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const store = createStore(rootReducer, Reactotron.createEnhancer())

  // configure persistStore and check reducer version number
  //   if (ReduxPersist.active) {
  //     Rehydration.updateReducers(store)
  //   }

  // kick off root saga
  //   let sagasManager = sagaMiddleware.run(rootSaga)

  return store
}
