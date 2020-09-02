/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react'
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'
import {Provider} from 'react-redux'
import RootContainer from './src/components/containers/RootContainer'
import {store, persistor} from './src/redux/'
import 'react-native-gesture-handler'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {NavigationContainer} from '@react-navigation/native'
import {API_KEY} from '@env'
import Icon from 'react-native-vector-icons/FontAwesome'

if (__DEV__) {
  import('./src/utils/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  )
}
Icon.loadFont()
const App: () => React$Node = () => {
  let persistorSub
  useEffect(() => {
    // persistor will update to know its finished loading
    persistorSub = persistor.subscribe(handlePersistorState)
    handlePersistorState()
    return () => {
      if (persistorSub) persistorSub()
    }
  }, [])

  const handlePersistorState = () => {
    const {bootstrapped} = persistor.getState()
    if (bootstrapped) {
      // store.dispatch({ type: 'CHECK_TOKEN' })
      if (persistorSub) persistorSub()
    }
  }

  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            {<StatusBar barStyle='light-content' />}
            <RootContainer />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

export default App
