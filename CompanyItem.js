import React from "react"
import { Image, Text, StyleSheet, Linking } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { MAX_WIDTH } from "./constants"
export const CompanyItem = ({ id, logo, name, url, handler }) => {
  return (
    <TouchableOpacity onPress={() => {
      url ? Linking.openURL(url) : handler
    }} style={styles.body}>
      {
        logo && <Image style={styles.logo} resizeMode="contain" source={{uri: logo}} />
      }
      <Text style={styles.text} >{name} </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  body: {
    width: MAX_WIDTH,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    minWidth: 100, height: 40,
    marginRight: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    backgroundColor: "#ccc",
    opacity: 0.5,
    borderBottomWidth: 3,
    borderColor: "#000"
  }
})