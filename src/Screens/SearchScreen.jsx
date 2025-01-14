import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const SearchScreen = () => {
  const navigation = useNavigation();
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