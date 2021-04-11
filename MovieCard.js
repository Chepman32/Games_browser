import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { ImageBackground, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { CompanyItem } from "./CompanyItem"
import { MAX_HEIGHT, MAX_WIDTH } from "./constants"
import Spinner from "./Spinner"
export const MovieCard = ({ id, title, slug, release_date, overview, imgUrl }) => {
  const [dlc, setDlc] = useState([])
  const [description, setDescription] = useState("")
  const [released, setReleased] = useState("")
  const [website, setWebsite] = useState("")
  const [background_image, setBackground_image] = useState("")
  const [background_image_additional, setBackground_image_additional] = useState("")
  const [stores, setStores] = useState([])
  const [clip, setClip] = useState("")
  const [genres, setGenres] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [metacritic, setMetacritic] = useState([])
  const [metacritic_platforms, setMetacritic_platforms] = useState([])
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    getAll()
    getSimilar()
  }, [])
  const navigation = useNavigation()
  const getSimilar = async () => {
    try {
      const dlcData = await axios.get(`https://api.rawg.io/api/games/${slug}/additions`)
      setDlc([dlcData.data.results])
      console.log(dlc.length)
    }
    catch(e) {
      console.log(e)
    }
  }
  async function getAll() {
    const data = await axios.get(`https://api.rawg.io/api/games/${slug}`)
    const _description = data.data.description
    setDescription(_description)
    const _released = data.data.released
    setReleased(_released)
    const _website = await data.data.website
    setWebsite(_website)
    const _stores = data.data.stores
    setStores([...stores, _stores])
    const _background_image = data.data.background_image
    setBackground_image(_background_image)
    const _background_image_additional = data.data.background_image_additional
    setBackground_image_additional(_background_image_additional)
    const _clip = data.data.clip.clip || ""
    const _genres = data.data.genres || []
    setGenres([...genres, _genres])
    const _platforms = data.data.platforms
    setPlatforms([...platforms, _platforms])
    setClip(_clip)
    setBackground_image_additional(platforms)
    const _metacritic = await data.data.metacritic
    setMetacritic(_metacritic)
    const _metacritic_platforms = data.data.metacritic_platforms
    setMetacritic_platforms([...metacritic_platforms, _metacritic_platforms])
  }
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate("MovieInfo", {
        id,
        title,
        slug,
        description,
        released,
        imgUrl,
        website,
        stores,
        background_image,
        background_image_additional,
        clip,
        genres,
        platforms,
        metacritic,
        metacritic_platforms,
        dlc
      })
    }}
    style={{
      justifyContent: "center",
    alignItems: "center",
    }}
    activeOpacity={0.85} >
      <ImageBackground source={ imgUrl? {
          uri: imgUrl,
        } : require("./assets/image-placeholder.jpg")} 
        style={styles.container}
        onLoad={() => setLoaded(true)}
        >
          {
            !loaded && <Spinner/>
          }
        </ImageBackground>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    minWidth: MAX_WIDTH,
    height: MAX_HEIGHT * 0.7,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginVertical: "40%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff"
  },
  img: {
    width: "100%",
    height: "50%"
  },
})