import Reactotron from 'reactotron-react-native'
import {AsyncStorage} from '@react-native-community/async-storage'
import {reactotronRedux} from 'reactotron-redux'

// configure reactotron.

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) 
  .configure() // controls connection & communication settings
  .use(reactotronRedux())
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

console.tron = Reactotron

export default reactotron
