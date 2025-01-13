import { View, Text, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const Cast = ({ cast, navigation }) => {
    let personName = "John Wick"
    let characterName = "Steve Jobs"
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
                                <View style={{marginRight: 12}}>
                                    <Image
                                        source={require('../Resources/Images/johnWick.jpeg')}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 40
                                        }}
                                    />
                                    <Text style={{ color: 'white', opacity: 0.6, textAlign: 'center' }}>
                                        {
                                            characterName.length > 10 ? characterName.slice(0, 10) + '...' : characterName
                                        }
                                    </Text>
                                    <Text style={{ color: 'white', opacity: 0.6, textAlign: 'center' }}>
                                        {
                                            personName.length > 10 ? personName.slice(0, 10) + '...' : personName
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