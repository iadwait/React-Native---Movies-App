import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { commonStyles } from '../Resources/Themes/commonThemes'
import { useNavigation } from '@react-navigation/native'
import { getImage185Path } from '../api/movie'

const { width, height } = Dimensions.get('window');

const MovieList = ({ title, data, hideSeeAll }) => {
  let movieName = 'Ant-Man and the Wasp: Quantumania'
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.topContainer}>
        <Text style={styles.upcomingTitle}>{title}</Text>
        {
          !hideSeeAll && (
            <TouchableOpacity>
              <Text style={[commonStyles.text, { fontSize: 18 }]}>See All</Text>
            </TouchableOpacity>
          )
        }
      </View>
      {/* Movie Row */}
      <ScrollView
        horizontal
        showHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}
              >
                <View style={{ paddingHorizontal: 10 }}>
                  <Image
                    // source={require('../Resources/Images/bean.jpeg')}
                    source={{ uri: getImage185Path(item.poster_path) }}
                    style={styles.upcomingMovieImage}
                  />
                  <Text style={{ color: 'white', width: '100' }} numberOfLines={2} >
                    {
                      item.title
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

export default MovieList

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  upcomingTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'semibold',
    marginVertical: 20,
  },
  upcomingMovieImage: {
    width: width * 0.30,
    height: height * 0.22,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 2
  }
})