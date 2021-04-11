import axios from "axios"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { useEffect, useState } from "react/cjs/react.development"
import { LANGUAGES_REQUEST } from "./constants"
export const Languages = ({route}) => {
  const setLanguage = route.params.setLanguage
  const [list, setList] = useState([])
  const language = route.params.language

  useEffect(() => {
    !list && getLanguages()
    console.log(language)
  })

  async function getLanguages() {
    const res = await axios.get("https://api.themoviedb.org/3/configuration/languages?api_key=70aa31a1529fcca9641d65cbe997a1e2")
    setList(res.data.map(
      l => l.english_name !== "No Language" && ({english_name: l.english_name, name: l.name, iso_639_1: l.iso_639_1})
    ))
  }
  useEffect(() => {
    getLanguages()
  }, [])
  return (
    <View style={styles.container}>
      {
        list.length > 0 &&
        <>
        <Text style={styles.text} onPress={() => console.log(list[0])} >Languages</Text>
        <ScrollView>
          {list.map(l => <Text key={Math.random().toString()} onPress={() => setLanguage(l.iso_639_1)} >{l.name || l.english_name} </Text>)}
        </ScrollView>
        </>
      }
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