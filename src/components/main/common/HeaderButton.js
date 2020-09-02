import React from 'react'
import {StyleSheet, TouchableOpacity, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {navigateToPage} from '../../../utils/utilities'
// import ColorPalette from "react-native-color-palette";

class HeaderButton extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    }
  }

  render () {
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: 25,
          marginTop: Platform.OS == 'ios' ? 0 : 30,
        }}
        onPress={() => this.props.navigation.pop()}
        title='Info'
        color='white'>
        <Icon name='arrow-circle-left' size={30} color='#900' />
      </TouchableOpacity>
    )
  }

  /* render function, etc */
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
  },
})

export default HeaderButton
