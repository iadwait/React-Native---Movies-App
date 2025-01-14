import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../Resources/Themes/commonThemes';

const { width, height } = Dimensions.get('window')
const Loading = () => {
  return (
    <View style={styles.container}>
        <Progress.CircleSnail thickness={12} size={120} color={theme.background} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        position: 'absolute',  // Absolute positioning
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,  // These make the View cover the entire screen
        justifyContent: 'center',  // Vertically center the spinner
        alignItems: 'center',  // Horizontally center the spinner
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Optional: add a semi-transparent background
        flex: 1
    }
})