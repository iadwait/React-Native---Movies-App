import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect, useCallback } from 'react'
import Loading from '../Components/loading'
import { fetchMoviesByKeyword, getImage185Path } from '../api/movie'
import debounce from 'lodash/debounce';

const { width, height } = Dimensions.get('window');

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState();

  useEffect(() => {
    console.log('Inside Searc Screen');
  },[])

  const handleSearchText = (text) => {
    setText(text)
    console.log(text)
    if (text && text.length > 2) {
      setLoading(true);
      // API Call
      getMoviesByKeyword(text)
    } else {
      setSearchResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearchText, 400), [])

  const getMoviesByKeyword = async (keyword) => {
    console.log(`Calling Search: ${text}`)
    const data = await fetchMoviesByKeyword(keyword)
    if (data && data.results) {
      setSearchResults(data.results);
      console.log('Search Movies Received');
    } else {
      setSearchResults([]);
      Alert.alert('Error', data.error);
    }
    setLoading(false);
    console.log('Movie Keyword Response: ', data)
  }

  return (
    <SafeAreaView style={styles.backgroundView}>
      <View style={styles.searchView}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          style={styles.searchTextfield}
        />
        <TouchableOpacity style={styles.clearButton} onPress={() => navigation.goBack()}>
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {
        loading ? (
          <Loading />
        ) : (
          searchResults.length > 0 ? (
            // Results
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            >
              <Text style={{ color: 'white' }}>Results ({searchResults.length})</Text>
              <View style={{ flexWrap: 'wrap', marginHorizontal: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                {
                  searchResults.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Movie', item)}>
                        <View style={{ marginVertical: 10 }}>
                          <Image
                            //source={require('../Resources/Images/MovieAvenger.jpg')}
                            source={item.poster_path ? { uri: getImage185Path(item.poster_path) } : require('../Resources/Images/NoProfile.png')}
                            style={{ width: width * 0.40, height: height * 0.20 }}
                          />
                          <Text style={{ color: 'lightgray', textAlign: 'center' }}>
                            {
                              item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title
                            }
                          </Text>
                        </View>

                      </TouchableWithoutFeedback>
                    )
                  })
                }
              </View>
            </ScrollView>
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>No Results</Text>
            </View>
          )
        )

      }

    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: "#2d2d2d"
  },
  searchView: {
    borderColor: 'white',
    borderWidth: 1,
    margin: 20,
    padding: 5,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  searchTextfield: {
    flex: 1,
    color: 'white',
    paddingHorizontal: 14,
    marginRight: 10,
    flexWrap: 'nowrap',
    height: 40,
    width: 40

  },
  clearButton: {
    padding: 5,
    backgroundColor: 'gray',
    borderRadius: 20
  }
});