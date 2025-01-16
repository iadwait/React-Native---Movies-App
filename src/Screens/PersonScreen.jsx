import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native'
import React from 'react'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../Resources/Themes/commonThemes'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import MovieList from '../Components/MovieList'
import Loading from '../Components/loading'
import { fetchPersonDetails, fetchPersonMovies, getImage342Path } from '../api/movie'

const { width, height } = Dimensions.get('window');

const PersonScreen = ({ route }) => {
    const [isFavourite, toggleFavourite] = useState(false);
    const [personData, setPersonData] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { person } = route.params
    useEffect(() => {
        console.log('Person Data: ', person.id)
        setLoading(true);
        getPersonDetails()
        getPersonMovies()
    }, [])

    const getPersonDetails = async () => {
        const data = await fetchPersonDetails(person.id);
        console.log('Person Api Response: ', data)
        if (data) {
            setPersonData(data)
        } else {
            Alert.alert('Alert', data.error);
        }
        setLoading(false);
    }

    const getPersonMovies = async () => {
        const data = await fetchPersonMovies(person.id);
        if (data && data.cast) {
            setPersonMovies(data.cast)
        }
    }

    const getGenderText = (code) => {
        if (code === 1) {
            return 'Female'
        } else if (code === 2) {
            return 'Male'
        } else {
            return 'Not set / not specified'
        }
    }

    const doNullCheck = (value) => {
        return value || 'Not Available'
    }

    return (
        <View style={styles.backgroundView}>
            <SafeAreaView style={styles.topContainer}>
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
            </SafeAreaView>

            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Person Details */}
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                //source={require('../Resources/Images/johnWickProfile.jpeg')}
                                source={personData?.profile_path ? { uri: getImage342Path(personData.profile_path) } : require('../Resources/Images/NoProfile.png')}
                                style={{
                                    height: width * 0.70,
                                    width: width * 0.70,
                                    borderRadius: width * 0.35,
                                    borderColor: 'gray',
                                    borderWidth: 1.5
                                }}
                            />
                            <Text style={{
                                fontSize: 28,
                                color: 'white',
                                fontWeight: 'bold',
                                marginTop: 15
                            }}>{personData.name}</Text>

                            <Text style={{
                                fontSize: 15,
                                color: 'white',
                                opacity: 0.5
                            }}>{personData.place_of_birth}</Text>
                        </View>
                        <View style={styles.container}>
                            <View>
                                <Text style={styles.titleText}>Gender</Text>
                                <Text style={styles.valueText}>{getGenderText(personData.gender)}</Text>
                            </View>

                            <View style={styles.verticalLine} />

                            <View>
                                <Text style={styles.titleText}>BirthDay</Text>
                                <Text style={styles.valueText}>{doNullCheck(personData.birthday)}</Text>
                            </View>

                            <View style={styles.verticalLine} />

                            <View>
                                <Text style={styles.titleText}>Known for</Text>
                                <Text style={styles.valueText}>{doNullCheck(personData.known_for_department)}</Text>
                            </View>

                            <View style={styles.verticalLine} />

                            <View>
                                <Text style={styles.titleText}>Popularity</Text>
                                <Text style={styles.valueText}>{doNullCheck(personData?.popularity?.toFixed(2))}</Text>
                            </View>
                        </View>

                        {/* Biography */}
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Biography</Text>
                            <Text style={{ color: 'white', opacity: 0.4, fontSize: 14, marginTop: 10 }}>
                                {
                                    doNullCheck(personData.biography)
                                }
                            </Text>
                        </View>

                        {/* Movies */}
                        <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />

                    </ScrollView>
                )
            }
        </View>
    )
}

export default PersonScreen

const styles = StyleSheet.create({
    backgroundView: {
        flex: 1,
        backgroundColor: "#2d2d2d",
        paddingBottom: 20
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backButton: {
        marginLeft: 10,
        marginTop: 10,
    },
    heartButton: {
        marginRight: 10,
        marginTop: 20
    },
    container: {
        flexDirection: 'row', // Layout in a row
        justifyContent: 'space-between', // Spread out columns evenly
        alignItems: 'center', // Align items vertically in the center
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#4d4d4d',
        //opacity: 0.4,
        marginHorizontal: 20,
        borderRadius: 30,
        marginVertical: 10
    },
    verticalLine: {
        width: 1,
        backgroundColor: 'white', // Vertical divider color
        height: '100%', // Ensure it spans the height of the container,
    },
    titleText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'semibold'
    },
    valueText: {
        color: 'white',
        opacity: 0.7,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'regular',
        //flexWrap: 'wrap'
    }
})