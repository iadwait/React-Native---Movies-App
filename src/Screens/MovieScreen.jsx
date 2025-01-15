import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../Resources/Themes/commonThemes'
import { useNavigation } from '@react-navigation/native'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useState, useEffect } from 'react'
import Cast from '../Components/Cast'
import MovieList from '../Components/MovieList'
import { fetchMovieDetails, fetchMovieCredits, image500 } from '../api/movie'

const { width, height } = Dimensions.get('window');

const MovieScreen = ({ route }) => {
    console.log(route)
    const navigation = useNavigation();
    let movieName = 'Ant-Man and the Wasp: Quantumania'
    const [isFavourite, toggleFavourite] = useState(false);
    const { id } = route.params
    const [movieDetail, setMovieDetail] = useState({});
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);

    useEffect(() => {
        console.log(`Movie ID: ${id}`)
        getMovieDetails()
        getMovieCast()
    }, [])

    // Movie Details
    const getMovieDetails = async () => {
        const data = await fetchMovieDetails(id)
        console.log('Data Receive = ', data)
        if (data) {
            setMovieDetail(data)
            //console.log('Parsed Data = ', movieDetail.params.overview)
        } else {
            Alert.alert('Error', data.error)
        }
        console.log(`Movie Details = ${data}`)
    }

    // Movie Cast
    const getMovieCast = async () => {
        console.log('Inside Movie Cast')
        const data = await fetchMovieCredits(id)
        console.log('Inside Movie Cast: 1')
        if (data && data.cast) {
            console.log(`Cast Fetched = ${JSON.stringify(data, null, 2)}`)
            setCast(data.cast)
        } else {
            console.log("Failed to get Cast")
            Alert.alert('Error', data.error)
        }
    }

    return (
        <ScrollView style={styles.backgroundView}>
            <SafeAreaView>
                <View style={styles.imageContainer}>
                    <Image
                        //source={require('../Resources/Images/MovieAvenger.jpg')}
                        source={{ uri: image500(movieDetail.poster_path) }}
                        style={{
                            width: width,
                            height: height * 0.55,
                            opacity: 0.3
                        }}
                    />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
                        <Image
                            source={require('../Resources/Images/backArrow.png')}
                            style={[commonStyles.background, { tintColor: 'white', width: 35, height: 35, margin: 10, borderRadius: 20 }]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.heartButton} onPress={() => toggleFavourite(!isFavourite)} >
                        <HeartIcon
                            size="35"
                            color={isFavourite ? "red" : "white"}
                            style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Movie Details */}
            <View style={{ marginHorizontal: 20 }}>
                {/* Title */}
                <Text style={styles.movieName}>{movieDetail.original_title}</Text>
                {/* Status, release, runtime */}
                <Text style={{ color: 'white', opacity: 0.7, textAlign: 'center', marginTop: 10 }} >Released • {movieDetail?.release_date?.split('-')[0]} • {movieDetail?.runtime} min</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Text
                        style={{
                            color: 'white',
                            opacity: 0.7,
                            textAlign: 'center',
                            marginTop: 10
                        }}
                    >
                        {movieDetail?.genres?.map((genre, index) => {
                            const showDot = index + 1 !== movieDetail.genres.length;
                            return genre?.name + (showDot ? ' • ' : '');
                        }).join('')}
                    </Text>
                </View>
                <Text style={{ color: 'white', opacity: 0.5, textAlign: 'left', marginTop: 10 }}>
                    {
                        movieDetail?.overview
                    }
                </Text>
            </View>

            {/* Cast */}
            <Cast navigation={navigation} cast={cast} />

            {/* Similar Movies */}
            <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />

        </ScrollView>
    )
}

export default MovieScreen

const styles = StyleSheet.create({
    backgroundView: {
        flex: 1,
        backgroundColor: "#2d2d2d",
        paddingBottom: 20
    },
    imageContainer: {
        position: 'relative',
        width: width,
        height: height * 0.46,
    },
    backButton: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 1
    },
    heartButton: {
        position: 'absolute',
        right: 10,
        top: 20,
        zIndex: 1
    },
    movieName: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})