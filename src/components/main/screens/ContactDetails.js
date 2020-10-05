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

const ContactDetails = ({route, navigation}) => {

  const [contact, setContact] = useState(route.params.contact)

  const renderContactCard = () => {
    const {name, picture, email, phone, location, id} = contact
    return (
      <Card containerStyle={{backgroundColor: 'white'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Card.Title style={{fontSize: 18}}>{`${name.first} ${name.last}`}</Card.Title>
          <Card.Divider />
          <View key={id.value} style={styles.cardContainer}>
            <View style={{flex: 1}}>
              <Image
                style={styles.image}
                // resizeMode='cover'
                source={{
                  uri: picture.large || Constants.URL.PLACEHOLDER_IMAGE,
                }}
              />
            </View>
            <View style={styles.overview}>
              <Text style={styles.overViewTxt}>{`Country: ${location.country}`}</Text>
              <Text style={styles.overViewTxt}>{`City: ${location.city}`}</Text>
              <Text style={styles.overViewTxt}>{`Street: ${location.street.name}, ${location.street.number}`}</Text>
            </View>
            <View style={styles.subSection}>
              <View style={styles.leftSideView}>
                <Text style={styles.leftSideTxt}>
                  {`Email: ${email}`}
                </Text>
                <Text style={styles.leftSideTxt}>
                  {`Phone Number: ${phone}`}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Card>
    )
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'space-between',
          justifyContent: 'space-between',
        }}>
        {renderContactCard()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
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
  image: {alignSelf: 'center', width: 200, height: 200},
  overview: {
    flex: 1,
    flexDirection:'column',
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
    fontSize: 14,
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: 'black',
    textAlign: 'auto',
  },
  gradient: {
    flex: 1,
    width: 130,
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
    alignItems: 'flex-start',
    width: 150,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  gotItBtn: {
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
    fontSize: 12,
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

export default ContactDetails