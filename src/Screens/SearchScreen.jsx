import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

const {width, height} = Dimensions.get('window');

const SearchScreen = () => {
  const navigation = useNavigation();
  let movieName = 'Ant-Man and the Wasp: Quantumania'
  const [searchResults, setSearchResults] = useState([1,2,3,4,5]);
  return (
    <SafeAreaView style={styles.backgroundView}>
      <View style={styles.searchView}>
        <TextInput 
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          style={styles.searchTextfield}
        />
        <TouchableOpacity style={styles.clearButton} onPress={() => navigation.goBack()}>
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {
        searchResults.length>0 ? (
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
                  <TouchableWithoutFeedback key={index}>
                    <View style={{ marginVertical: 10 }}>
                      <Image
                        source={require('../Resources/Images/MovieAvenger.jpg')}
                        style={{ width: width * 0.40, height: height * 0.20 }}
                      />
                      <Text style={{ color: 'lightgray', textAlign: 'center' }}>
                        {
                          movieName.length > 22 ? movieName.slice(0, 22) + '...' : movieName
                        }
                      </Text>
                    </View>
  
                  </TouchableWithoutFeedback>
                )
              })
            }
          </View>
        </ScrollView>
        ): (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>No Results</Text>
          </View>
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