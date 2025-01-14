import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrendingMovies from '../Components/TrendingMovies';
import { useState } from 'react'
import MovieList from '../Components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Components/loading';
// Images
const menuImage = require('../Resources/Images/Menu.png');
const searchImage = require('../Resources/Images/Search.png');

const HomeScreen = () => {
  const navigation = useNavigation();
  //const [trending, setTrending] = useState([1,2,3,4,5]);
  const [trending, setTrending] = useState([
    { id: '1', title: 'Avengers', image: require('../Resources/Images/MovieAvenger.jpg') },
    { id: '2', title: 'Iron Man', image: require('../Resources/Images/MovieAvenger.jpg') },
    { id: '3', title: 'Thor', image: require('../Resources/Images/MovieAvenger.jpg') },
    { id: '4', title: 'Spiderman', image: require('../Resources/Images/MovieAvenger.jpg') },
    { id: '5', title: 'Black Widow', image: require('../Resources/Images/MovieAvenger.jpg') },
  ]);
  const [upcomingMovie, setUpcomingMovie] = useState([1,2,3,4,5]);
  const [topRatedMovie, setTopRatedMovie] = useState([1,2,3,4,5]);
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.backgroundView}>
      {/* SearchBar and Logo */}
      <SafeAreaView>
        <StatusBar style='light' />
        <View style={styles.topContainer}>
          <TouchableOpacity>
            <Image style={[styles.icon, { marginLeft: 20 }]} source={menuImage} />
          </TouchableOpacity>
          <Text style={styles.moviesTitle}>Movies</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image style={[styles.icon, { marginRight: 20 }]} source={searchImage} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView
            showVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {/* Trending Movies Carousel */}
            <TrendingMovies data={trending} />

            {/* Upcoming Movies */}
            <MovieList title='Upcoming Movies' data={upcomingMovie} />

            {/* Top Rated Movies */}
            <MovieList title='Top Rated Movies' data={topRatedMovie} />

            {/* Top Rated Movies */}
          </ScrollView>
        )
      }

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: "#2d2d2d"
  },
  topContainer: {
    flexDirection: 'row',
    tintColor: 'white',
    color: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    tintColor: 'white',
    width: 30,
    height: 30,
    marginTop: 20
  },
  moviesTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20
  }
});