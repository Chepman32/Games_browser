import { useNavigation } from "@react-navigation/native"
import React from "react"
import { ImageBackground, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { MAX_HEIGHT, MAX_WIDTH } from "./constants"
export const SimilarItem = ({ id, name, released, platforms, background_image, screenshots }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => {
      navigation.push( "MovieInfo", {id, name, released, platforms, background_image, screenshots} )
    }}
    activeOpacity={0.85} style={styles.container} >
      <ImageBackground resizeMode="contain" source={{
      uri: background_image,
    }} 
    style={styles.container}
    
    >

    </ImageBackground>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:  1,
    minWidth: MAX_WIDTH * 0.95,
    height: MAX_HEIGHT,
    margin: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  img: {
    width: "100%",
    height: "50%"
  },
})