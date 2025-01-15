import { View, Text, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { getImage185Path } from '../api/movie'

const Cast = ({ cast, navigation }) => {
    return (
        <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginVertical: 20 }}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.navigate('Person', person)}
                            >
                                <View style={{ marginRight: 12 }}>
                                    <Image
                                        //source={require('../Resources/Images/johnWick.jpeg')}
                                        source={person.profile_path ? { uri: getImage185Path(person.profile_path) } : require('../Resources/Images/NoProfile.png')}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 40
                                        }}
                                    />
                                    <Text style={{ color: 'white', opacity: 0.6, textAlign: 'center' }}>
                                        {
                                            person.character.length > 10 ? person.character.slice(0, 10) + '...' : person.character
                                        }
                                    </Text>
                                    <Text style={{ color: 'white', opacity: 0.6, textAlign: 'center' }}>
                                        {
                                            person.original_name.length > 10 ? person.original_name.slice(0, 10) + '...' : person.original_name
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Cast