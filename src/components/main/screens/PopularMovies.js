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
  StatusBar,
  FlatList,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Images from '../../../resources/Images'
import {fetchPopularMovies} from '../../../api'
import {CustomLoader} from '../common/CustomLoader'
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
import {setPopularMovies} from '../../../actions/MoviesActions'
// import ColorPalette from "react-native-color-palette";
import Constants from '../../../utils/constants'
import {navigateToPage} from '../../../utils/utilities'
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native-gesture-handler'
const {width, height} = Dimensions.get('window')

const PopularMovies = props => {
  const dispatch = useDispatch()
  const {movies} = useSelector(state => state.MovieReducer)
  const [movieDetails, setMovieDetails] = useState({})
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    fetchPopularMovies().then(results =>
      dispatch(setPopularMovies(results.data)),
    )
  }, [])

  useEffect(() => {
    if (movies) {
      setMovieDetails(movies)
    }
    // return () => {
    //   cleanup
    // }
  }, [movies])

  const moveToSelectedMovie = movie => {}

  const renderFlatListItem = data => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigateToPage('MovieDetails', props.navigation, {
            movie: data.item,
            from: 'popularMovies',
          })
        }>
        <View style={styles.imageCard}>
          <Image
            style={styles.image}
            source={{
              uri:
                data.item.poster_path != null
                  ? Constants.URL.IMAGE_URL + data.item.poster_path
                  : Constants.URL.PLACEHOLDER_IMAGE,
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  const renderFlatList = () => {
    {
      /* popularity:27.816
        vote_count:2570
        video:false
        poster_path:/6pLPWF7AXhljLJf8WTli9BuVfyv.jpg
        id:12437
        adult:false
        backdrop_path:/c7JgVgsF2qMp2UbCr9mCx85CIZo.jpg
        original_language:en
        original_title:Underworld: Rise of the Lycans
        title:Underworld: Rise of the Lycans
        vote_average:6.4
        overview:A prequel to the first two Underworld films, this fantasy explains the origins of the feud between the Vampires and the Lycans. Aided by his secret love, Sonja, courageous Lucian leads the Lycans in battle against brutal Vampire king Viktor. Determined to break the king's enslavement of his people, Lucian faces off against the Death Dealer army in a bid for Lycan independence.
        release_date:2009-01-22 */
    }
    return (
      <FlatList
        bounces={false}
        data={movieDetails}
        showsVerticalScrollIndicator={false}
        renderItem={item => renderFlatListItem(item)}
        keyExtractor={item => item.id}
        numColumns={2}
        extraData={null}
        style={styles.listStyle}
      />
    )
  }

  return (
    <View style={styles.container}>
      {movies ? (
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'space-between',
            justifyContent: 'space-between',
            marginTop: 50,
          }}>
          {renderFlatList()}
        </View>
      ) : (
        <View style={styles.loader}>
          <CustomLoader size={20} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: '40%',
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageCard: {
    padding: 5,
    margin: 15,
    width: 150,
    textAlign: 'center',
    borderColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
  },
  image: {width: 140, height: 200},
})

export default PopularMovies
