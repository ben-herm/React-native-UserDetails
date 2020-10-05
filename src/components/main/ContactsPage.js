import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  ScrollView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {fetchContacts} from '../../api';
import {setContacts, updateContacts} from '../../actions/ContactActions';
import {navigateToPage} from '../../utils/utilities';
import {CustomLoader} from '../main/common/CustomLoader';
import Constants from '../../utils/constants';
const width = Dimensions.get('window').width;
import {PURGE} from 'redux-persist';
const ContactsPage = (props) => {
  const dispatch = useDispatch();
  const {contacts, persistedContacts} = useSelector(
    (state) => state.ContactsReducer,
  );
  const [isloadingMore, setIsLoadingMore] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    initialiseList();
    // dispatch({type: PURGE})
  }, []);

  useEffect(() => {
    persistedContacts && setContactList(persistedContacts);
  }, [persistedContacts]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        loadMoreResults();
      }, 5000);
    }
    setError(false);
  }, [error]);

  const initialiseList = async () => {
    if (persistedContacts.length < 1) {
      fetchContacts().then((result) => {
        let data = Object.values(result.data.results);
        dispatch(updateContacts(data));
      });
    } else {
      dispatch(setContacts(persistedContacts));
    }
    setContactList(contacts);
  };

  const loadMoreResults = async () => {
    let newContacts;
    let finalContacts;
    if (isloadingMore || loadingDone) return;

    setIsLoadingMore(true);

    if (contacts && contacts.length > 0) {
      fetchContacts()
        .then((newList) => {
          newContacts = newList;
          if (!newContacts || newContacts.length === 0) {
            setLoadingDone(true);
          } else {
            let data = Object.values(newContacts.data.results);
            finalContacts = contacts.concat(data);
            // arbitrary number to limit size of stored contacts in persist
            if (contacts.length < 40) {
              dispatch(updateContacts(finalContacts));
            } else {
              dispatch(setContacts(finalContacts));
            }
          }
          setIsLoadingMore(false);
        })
        .catch(() => {
          setIsLoadingMore(false);
          setError(true);
        });
      setContactList(contacts);
    }

    // await delay(1000);
  };

  const renderFlatListItem = (data, index) => {
    return (
      <React.Fragment key={index}>
        <TouchableOpacity
          onPress={() =>
            navigateToPage('ContactDetails', props.navigation, {
              contact: data.item,
            })
          }>
          <View style={styles.imageCard}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{
                uri: data.item.picture.large || Constants.URL.PLACEHOLDER_IMAGE,
              }}
            />
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  };

  const renderFlatList = () => {
    return (
      <FlatList
        // bounces={false}
        data={contactList}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{padding: 15}}>
            {isloadingMore && <CustomLoader size={10} />}
          </View>
        }
        scrollEventThrottle={250}
        onEndReachedThreshold={0.5}
        onEndReached={(info) => {
          loadMoreResults();
        }}
        renderItem={(item, index) => renderFlatListItem(item, index)}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={styles.listStyle}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {contactList.length > 0 ? (
        renderFlatList()
      ) : (
        <View style={{marginTop: 150}}>
          <CustomLoader size={40} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  loader: {
    position: 'absolute',
    top: '40%',
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageCard: {
    flex: 1,
    padding: 5,
    margin: 15,
    width: width * 0.4,
    borderColor: 'black',
    borderRadius: 16,
    borderWidth: 2,
  },
  image: {
    width: 'auto',
    height: 140,
  },
  welcomeTxtView: {alignSelf: 'center', marginTop: 75},
});

export default ContactsPage;
