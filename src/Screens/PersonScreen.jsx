import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../Resources/Themes/commonThemes'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import MovieList from '../Components/MovieList'
import Loading from '../Components/loading'

const { width, height } = Dimensions.get('window');

const PersonScreen = () => {
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
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
                    <ScrollView>
                        {/* Person Details */}
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../Resources/Images/johnWickProfile.jpeg')}
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
                            }}>Keanu Reeves</Text>

                            <Text style={{
                                fontSize: 15,
                                color: 'white',
                                opacity: 0.5
                            }}>London, United Kingdom</Text>
                        </View>
                        <View style={styles.container}>
                            <View>
                                <Text style={styles.titleText}>Gender</Text>
                                <Text style={styles.valueText}>Male</Text>
                            </View>

                            <View style={styles.verticalLine} />

                            <View>
                                <Text style={styles.titleText}>BirthDay</Text>
                                <Text style={styles.valueText}>1965-09-02</Text>
                            </View>

                            <View style={styles.verticalLine} />

                            <View>
                                <Text style={styles.titleText}>Known for</Text>
                                <Text style={styles.valueText}>Acting</Text>
                            </View>

                            <View style={styles.verticalLine} />

                            <View>
                                <Text style={styles.titleText}>Popularity</Text>
                                <Text style={styles.valueText}>73.90</Text>
                            </View>
                        </View>

                        {/* Biography */}
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Biography</Text>
                            <Text style={{ color: 'white', opacity: 0.4, fontSize: 14, marginTop: 10 }}>Wick entered the world of organized crime and became an enforcer for Viggo Tarasov, a ruthless Russian crime lord. His ability to eliminate targets with ruthless efficiency quickly earned him a fearsome reputation in the underworld. He was renowned for his expertise in various forms of combat, precision with firearms, and his unmatched ability to complete seemingly impossible tasks.Over time, John Wick became so feared that even the most dangerous criminals in the world respected and feared him. He was known as a man who could take down entire armies with a single weapon, earning the respect and fear of anyone who crossed his path.</Text>
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