import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrendingMovies from '../Components/TrendingMovies';
import { useState, useEffect } from 'react'
import MovieList from '../Components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/movie';
// Images
const menuImage = require('../Resources/Images/Menu.png');
const searchImage = require('../Resources/Images/Search.png');

const HomeScreen = () => {
  const navigation = useNavigation();
  //const [trending, setTrending] = useState([1,2,3,4,5]);
  const [trending, setTrending] = useState([]);
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  // Life Cycle
  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log('API Response: Trending Movies: ', data)
    if (data && data.results) {
      console.log('Trending Results: ', data.results.length)
      setTrending(data.results)
    } else {
      Alert.alert('Error', data.error)
    }
    setLoading(false)
  }

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log('API Response: Upcoming Movies: ', data)
    if (data && data.results) {
      console.log('Upcoming Results: ', data.results.length)
      setUpcomingMovie(data.results)
    } else {
      Alert.alert('Error', data.error)
    }
    setLoading(false)
  }

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log('API Response: TopRated Movies: ', data)
    if (data && data.results) {
      console.log('TopRated Results: ', data.results.length)
      setTopRatedMovie(data.results)
    } else {
      Alert.alert('Error', data.error)
    }
    setLoading(false)
  }

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
            { trending.length > 0 && <TrendingMovies data={trending} />}

            {/* Upcoming Movies */}
            { upcomingMovie.length>0 && <MovieList title='Upcoming Movies' data={upcomingMovie} /> }

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