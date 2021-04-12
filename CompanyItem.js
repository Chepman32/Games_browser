import React from "react"
import { Image, Text, StyleSheet, Linking } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme"
import { MAX_WIDTH } from "./constants"
export const CompanyItem = ({ id, logo, name, url, handler }) => {
  let colorScheme = useColorScheme()
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  return (
    <TouchableOpacity onPress={() => {
      url ? Linking.openURL(url) : handler
    }} style={styles.body}>
      {
        logo && <Image style={styles.logo} resizeMode="contain" source={{uri: logo}} />
      }
      <Text style={[styles.text, themeTextStyle]} >{name} </Text>
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
  },
  lightThemeText: {
    color: '#000',
  },
  darkThemeText: {
    color: '#fff',
  },
})