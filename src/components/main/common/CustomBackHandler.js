import {BackHandler, Platform} from 'react-native'
import {connect} from 'react-redux'
import {Component} from 'react'

import {
  setBackButtonFunction,
  EnableBackButton,
  DisableBackButton,
} from '../../actions'
import {getNewPageName, goBack} from '../../utilities/utilities'

class AIBackHandler extends Component {
  componentDidMount () {
    this.init()
    this.backButton = this.props.backButton
    this.pageName = getNewPageName()

    if (this.props.backAction) {
      this.props.setBackButtonFunction(this.props.backAction)
    }
  }

  componentWillUnmount () {
    this.reset()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.loader !== this.props.loader) {
      this.animateButton()
    }

    if (
      prevProps.backButton !== this.props.backButton &&
      this.pageName === getNewPageName() &&
      this.props.backButtonFunction
    ) {
      this.backButton = this.props.backButton
      this.pageName = getNewPageName()
    }

    if (!this.props.backButtonFunction && this.props.backAction) {
      // For Enable back to last page, Keep this.backButton and no nextProps.backButton
      // this.backButton ? nextProps.EnableBackButton() : nextProps.DisableBackButton();

      this.props.setBackButtonFunction(this.props.backAction)
    }
  }

  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.backButton !== this.props.backButton && this.pageName === getNewPageName() && nextProps.backButtonFunction) {
  //         this.backButton = nextProps.backButton
  //         this.pageName = getNewPageName()
  //     }
  //
  //     if (!nextProps.backButtonFunction && nextProps.backAction) {
  //         // For Enable back to last page, Keep this.backButton and no nextProps.backButton
  //         // this.backButton ? nextProps.EnableBackButton() : nextProps.DisableBackButton();
  //
  //         nextProps.setBackButtonFunction(nextProps.backAction)
  //     }
  // }

  _activateBackAction = () => {
    if (this.props.backAction) {
      this.props.backAction()

      return true
    }
    return false
  }

  init () {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this._activateBackAction,
      )
    }
  }

  reset () {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this._activateBackAction,
      )
    }
    if (this.props.setBackButtonFunction) {
      this.props.setBackButtonFunction(null)
    }
  }

  render () {
    if (this.props.children) return this.props.children
    return null
  }
}

AIBackHandler.defaultProps = {
  backAction: () => {
    goBack()
  },
}

const mapStateToProps = state => ({
  ...state.HeaderReducer,
})

export default connect(mapStateToProps, {
  setBackButtonFunction,
  EnableBackButton,
  DisableBackButton,
})(AIBackHandler)
