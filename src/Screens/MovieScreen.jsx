import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../Resources/Themes/commonThemes'
import { useNavigation } from '@react-navigation/native'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useState } from 'react'
import Cast from '../Components/Cast'
import MovieList from '../Components/MovieList'

const { width, height } = Dimensions.get('window');

const MovieScreen = ({ route }) => {
    console.log(route)
    const navigation = useNavigation();
    let movieName = 'Ant-Man and the Wasp: Quantumania'
    const [isFavourite, toggleFavourite] = useState(false);
    const { title } = route.params
    const [cast, setCast] = useState([1,2,3,4,5,6,,7]);
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5]);
    return (
        <ScrollView style={styles.backgroundView}>
            <SafeAreaView>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../Resources/Images/MovieAvenger.jpg')}
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
                <Text style={styles.movieName}>{movieName}</Text>
                {/* Status, release, runtime */}
                <Text style={{ color: 'white', opacity: 0.7, textAlign: 'center', marginTop: 10 }} >Released • 2020 • 170 min</Text>
                <Text style={{ color: 'white', opacity: 0.7, textAlign: 'center', marginTop: 10 }} >Action • Thrill • Comedy</Text>
                <Text style={{ color: 'white', opacity: 0.5, textAlign: 'left', marginTop: 10 }}>
                    As the crew travels through space aboard the starship Elysium, they encounter unforeseen challenges — from deadly cosmic storms to an alien civilization whose intentions are shrouded in mystery. Lena must confront her past, the loss of her family, and the ethical dilemmas of saving a dying species while learning the true nature of the planet they are racing to reach.
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