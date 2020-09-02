import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Modal from 'react-native-modal'
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import Constants from '../../../utils/constants'
import {Card} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import {
  addToFavorites,
  deleteFromFavorites,
} from '../../../actions/MoviesActions'

const MovieDetails = ({route, navigation}) => {
  const dispatch = useDispatch()
  const {favorites, movies} = useSelector(state => state.MovieReducer)
  const [movie, setMovie] = useState(route.params.movie)
  const [isFavorite, setIsFavorite] = useState(false)
  const [openModal, setOpenModal] = useState({shouldOpen: false, method: ''})

  // check if movie is favorite comparing to favorite array by id.

  useEffect(() => {
    checkIfMovieIsFavorite()
  }, [])

  // check if movie is not favorite and add it, if it is open modal.

  const addMovieToFavorites = movie => {
    let oldFavorites = favorites
    const shouldNotAddToFav =
      oldFavorites && oldFavorites.some(favId => favId === movie.id)
    if (!shouldNotAddToFav) {
      dispatch(addToFavorites(movie.id))
    } else {
      setOpenModal({shouldOpen: true, method: 'favorite'})
    }
  }

  // modal rendering

  const openPopUp = method => {
    return (
      <View style={styles.modalContainer}>
        <Modal
          useNativeDriver={true}
          transparent
          isVisible={openModal.shouldOpen}
          // hasBackdrop={true}
          animationInTiming={750}>
          <View style={styles.outerModalView}>
            <View style={styles.innerModalView}>
              {
                <Text style={{textAlign: 'center', fontSize: 20}}>
                  {method == 'favorite'
                    ? 'Movie is already in favorites'
                    : 'Movie is already Deleted'}
                </Text>
              }
            </View>
            <View style={{position: 'absolute', bottom: 25}}>
              <TouchableOpacity
                onPress={() => setOpenModal({shouldOpen: false, method: ''})}
                style={styles.addToFavBtn}>
                <LinearGradient
                  colors={['#ffb347', '#ffcc33']}
                  style={styles.gradient}>
                  <Text style={styles.favBtnTxt}>{'Got it!'}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  // delete movie form favorites if it is not there open modal.

  const DeleteMovieFromFavorites = movie => {
    let oldFavorites = favorites
    const checkIfFavExists =
      oldFavorites && oldFavorites.some(favId => favId === movie.id)
    if (checkIfFavExists) {
      let newFavorites = oldFavorites.filter(fav => fav !== movie.id)
      dispatch(deleteFromFavorites(newFavorites))
    } else {
      setOpenModal({shouldOpen: true, method: 'Delete'})
    }
  }

  // check favorite (check row 30)

  const checkIfMovieIsFavorite = () => {
    if (favorites.length > 0) {
      let isFav = favorites.some(id => id == movie.id)
      if (isFav) setIsFavorite(true)
    }
  }

  // render delete or add to favorite button.

  const renderBtn = isFav => {
    if (isFav) {
      return (
        <TouchableOpacity
          onPress={() => DeleteMovieFromFavorites(movie)}
          style={styles.addToFavBtn}>
          <LinearGradient
            colors={['#20002c', '#cbb4d4']}
            style={styles.gradient}>
            <Text style={styles.favBtnTxt}>{'Delete From Favorites'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity
        onPress={() => addMovieToFavorites(movie)}
        style={styles.addToFavBtn}>
        <LinearGradient colors={['#20002c', '#cbb4d4']} style={styles.gradient}>
          <Text style={styles.favBtnTxt}>{'Add To Favorites'}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  // render movie view card showing details.

  const renderMovieCard = () => {
    return (
      <Card containerStyle={{backgroundColor: 'white'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Card.Title style={{fontSize: 18}}>{movie.title}</Card.Title>
          <Card.Divider />
          <View key={movie.id} style={styles.cardContainer}>
            <View style={{flex: 1}}>
              <Image
                style={styles.image}
                // resizeMode='cover'
                source={{
                  uri:
                    movie.poster_path != null
                      ? Constants.URL.IMAGE_URL + movie.poster_path
                      : Constants.URL.PLACEHOLDER_IMAGE,
                }}
              />
            </View>
            <View style={styles.overview}>
              <Text style={styles.overViewTxt}>{movie.overview}</Text>
            </View>
            <View style={styles.subSection}>
              <View style={styles.rightSideView}>{renderBtn(isFavorite)}</View>
              <View style={styles.leftSideView}>
                <Text style={styles.leftSideTxt}>
                  {`Rating: ${movie.vote_average}`}
                </Text>
                <Text style={styles.leftSideTxt}>
                  {`Language: ${movie.original_language}`}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Card>
    )
  }

  // return the movie card and open Modal based on  triggers above.
  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'space-between',
          justifyContent: 'space-between',
        }}>
        {renderMovieCard()}
        {openModal.shouldOpen ? openPopUp(openModal.method) : null}
      </View>
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
  subSection: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  image: {alignSelf: 'center', width: 250, height: 350},
  overview: {
    flex: 1,
    marginTop: 10,
  },
  overViewTxt: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 1,
    color: 'black',
    textAlign: 'center',
  },
  leftSideView: {
    flex: 1,
    flexDirection: 'column',
  },
  rightSideView: {
    flex: 1,
    flexDirection: 'column',
  },
  leftSideTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: 'black',
    textAlign: 'auto',
  },
  gradient: {
    flex: 1,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderRadius: 16,
    borderWidth: 1,
  },
  addToFavBtn: {
    margin: 5,
    height: 30,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  favBtnTxt: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerModalView: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  outerModalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 140,
    borderRadius: 16,
  },
})

export default MovieDetails
