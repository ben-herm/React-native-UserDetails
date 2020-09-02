import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {
  ScrollView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Images from '../../resources/Images'
import {navigateToPage} from '../../utils/utilities'
// import { navigateToPage } from "../../Services/Utilities";
// import ModalActions from "../../Redux/AppModalRedux";
// import ListsActions from "../../Redux/ListsRedux";
// import ExamplesRegistry from "../../Services/ExamplesRegistry";
// import { addModalButtonsAnimation } from "../../Services/Animatables";
// import { calcSize } from "../../Components/Styles/stylesUtils";
// import { Overlay } from "../common/Overlay";
// import ModalDropdown from 'react-native-modal-dropdown';
// import CustomInput from "../TextInputs/CustomInput";
// import { setUserSignUp } from "../../../App/Sagas/LoginSagas";
import Icon from 'react-native-vector-icons/FontAwesome'

// import ColorPalette from "react-native-color-palette";
const {width, height} = Dimensions.get('window')

const WelcomePage = props => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={styles.welcomeTxtView}>
        <Text style={styles.doneButtonText}> {'Welcome'}</Text>
      </View>
      <View style={styles.buttonsViewStyle}>
        <TouchableOpacity
          onPress={() => navigateToPage('PopularMovies', props.navigation)}
          style={{
            ...styles.popularBtn,
          }}>
          <Text
            style={{
              ...styles.BtnText,
            }}>
            {' '}
            {'Popular Movies'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToPage('FavoriteMovies', props.navigation)}
          style={{
            ...styles.favoritesBtn,
          }}>
          <Text
            style={{
              ...styles.BtnText,
            }}>
            {' '}
            {'Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
  },
  buttonsViewStyle: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    padding: 10,
    paddingHorizontal: 25,
    bottom: 25,
  },
  favoritesBtn: {
    flex: 1,
    // borderRadius: calcSize(16.6),
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  popularBtn: {
    flex: 1,
    marginRight: 10,
    // borderRadius: calcSize(16.6),
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  BtnText: {
    fontSize: 13,
    fontWeight: '900',
    fontStyle: 'normal',
    lineHeight: 30.1,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#c86833',
  },
  doneButtonText: {
    fontSize: 42,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: 'white',
  },
  welcomeTxtView: {alignSelf: 'center', marginTop: 75},
})

export default WelcomePage
