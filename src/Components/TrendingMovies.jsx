import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { getImage500Path } from '../api/movie';

const { width, height } = Dimensions.get('window');

const TrendingMovies = ({ data }) => {

    const navigation = useNavigation();

    const handleMovieClick = (item) => {
        console.log(`Clicked on ${item.title}`)
        navigation.navigate('Movie', item);
    }
    const renderMovies = ({ item }) => (
        <TouchableOpacity onPress={() => handleMovieClick(item)}>
            <View style={styles.card}>
                {/* <Image source={require('../Resources/Images/MovieAvenger.jpg')} style={styles.image} /> */}
                <Image source={{
                    //uri: image500(item.poster_path)
                    uri: getImage500Path(item.poster_path)
                }} 
                    style={styles.image} 
                    resizeMode="contain"
                    />
                <Text style={styles.movieName}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View>
            <Text style={styles.trendingTitle}>Trending</Text>
            <FlatList
                data={data}
                renderItem={renderMovies}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}  // Disable the scroll bar
                contentContainerStyle={styles.cardList}
            />
        </View>
    )
}

export default TrendingMovies

const styles = StyleSheet.create({
    trendingTitle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'semibold',
        margin: 20
    },
    cardList: {
        paddingLeft: 20,
    },
    card: {
        width: width * 0.6, // Each card takes up 60% of the screen width
        height: height*0.35,
        marginRight: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        //backgroundColor: 'red'
    },
    image: {
        width: width * 0.6, //100,
        height: height*0.30, //100,
        borderRadius: 10,
    },
    movieName: {
        color: 'white',
        fontSize: 20,
        flexWrap: 'wrap',
        fontWeight: 'semibold'
    }
})