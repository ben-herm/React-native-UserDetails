import React from 'react'
import {View, StatusBar} from 'react-native'
import {connect} from 'react-redux'
import AppNavigation from '../../navigation/AppNavigation'

class RootContainer extends React.Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <AppNavigation />
      </View>
    )
  }
}

export default connect(null, null)(RootContainer)
