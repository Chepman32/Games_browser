import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useState } from "react/cjs/react.development"
import { LANGUAGES_REQUEST } from "./constants"
export const Settings = ({route}) => {
  useEffect(() => {
    getLanguages()
    setStoredLanguage()
  }, [selectedLanguage])
  const [list, setList] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  useEffect(() => {
    selectedLanguage && setLanguage(selectedLanguage)
  }, [selectedLanguage])
  const setLanguage = route.params.setLanguage
  const language = route.params.language
  const navigation = useNavigation()
  const getStoredLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem("LANG")
    setSelectedLanguage(value)
    console.log("getStoredLanguage", value)
    setLanguage(value)
    }
    catch(e) {
      console.log(e)
    }
  }
  const setStoredLanguage = async () => {
    try {
      selectedLanguage !== language && await AsyncStorage.setItem("lang", selectedLanguage)
    }
    catch(e) {
      console.log(e)
    }
  }
  async function getLanguages() {
    try {
      const res = await axios.get(LANGUAGES_REQUEST)
    setList(res.data.map(
      l => ({english_name: l.english_name, name: l.name, iso_639_1: l.iso_639_1})
    ))
    }
    catch(e) {
      console.log(e)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => {
        setSelectedLanguage("en")
      }} >English</Text>
      <Text style={styles.text} onPress={() => {
        setSelectedLanguage("ru")
        setLanguage("ru")
      }} >Russian</Text>
      <Text style={styles.text} onPress={() => setSelectedLanguage("ko")} >Korean</Text>
      <Text style={styles.text} onPress={() => setSelectedLanguage("fr")} >French</Text>
      <Text style={styles.text} onPress={() => setSelectedLanguage("ja")} >Japanese</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 60
  }
})