import React, {Component} from 'react'
import {View, Animated, StyleSheet} from 'react-native'

class CustomLoader extends Component {
  constructor () {
    super()
    //set initial scale for circles in laoder

    this.state = {
      circles: [
        new Animated.Value(0.005),
        new Animated.Value(0.005),
        new Animated.Value(0.005),
      ],
    }
  }
  //push animation sequance for each circle

  _animation = () => {
    const ArrayOfAnimation = []

    this.state.circles.forEach((item, index) => {
      ArrayOfAnimation.push(
        Animated.sequence([
          Animated.timing(this.state.circles[index], {
            toValue: 1,
            duration: 600,
            delay: index * 300,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.circles[index], {
            toValue: 0.005,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      )
    })

    //loop through animation and add array of sequances to parallel

    Animated.loop(Animated.parallel(ArrayOfAnimation)).start()
  }

  //small delay

  componentDidMount () {
    setTimeout(() => {
      this._animation()
    }, 350)
  }

  _renderBubble = () => {
    const {color, size} = this.props

    return this.state.circles.map((item, index) => (
      <Animated.View
        key={index} // eslint-disable-line react/no-array-index-key
        style={{
          marginHorizontal: 3,
          transform: [{scale: this.state.circles[index]}],
          width: size,
          height: size,
          borderRadius: size,
          backgroundColor: color,
        }}
      />
    ))
  }

  render () {
    const {page} = this.props
    const {container} = styles
    return (
      <View style={[container, {flex: page ? 1 : 0}]}>
        {this._renderBubble()}
      </View>
    )
  }
}

CustomLoader.defaultProps = {
  size: 10,
  color: 'rgb(48,118,167)',
  page: false,
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
})

export {CustomLoader}
