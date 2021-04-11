import HTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { Video, AVPlaybackStatus } from 'expo-av';
import React, { useState, useEffect } from "react"
import { Image, Linking, StyleSheet, Text, View } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { CompanyItem } from "./CompanyItem"
import { MAX_HEIGHT, MAX_WIDTH, setIcon } from "./constants"
import AccordionComponent from "./Accordion";
import { SimilarItem } from "./SimilarItem";
var strip_tags = require("strip_tags");
export const MovieInfo = ({ route }) => {
  const [status, setStatus] = React.useState({});
  const {params} = route
  const id = params.id
  const title = params.title
  let description = params.description
  description = (
    <Text style={styles.overview} ><HTML source={{ html: description }} /></Text>
  )
  const released = params.released
    const website = params.website
    const genres = params.genres[0].map(g => <CompanyItem
      key={g.id}
      url={g.url}
       name={g.name}
       handler={() => navigation.navigate("Genre", {
        query: g.id,
        name: g.name
      })}
        logo={g.image_background}/>) || []
    const platforms = params.platforms[0].map(p => <View key={p.platform.id} style={{width: MAX_WIDTH}} >
      <Text style={styles.platform}
       onPress={() => navigation.navigate("Platforms", {
         query: p.platform.id,
         name: p.platform.name
       })}
       key={p.platform.id} >{p.platform.name} </Text>
    </View>)
    const stores = route.params.stores[0].map(s => <CompanyItem
       key={s.store.id}
       url={s.url}
        name={s.store.name}
         logo={setIcon(s.store.name)}/>)
         const dlc = params.dlc!== undefined ? params.dlc.map((d) => <SimilarItem 
         key={d.id}
         id={d.id} 
         name={d.name} 
         released={d.released}
         platforms={d.platforms} background_image={d[0].background_image} screenshots={d.short_screenshots}/> ) : []
    const clip = params.clip
  const imgUrl = params.imgUrl
  const metacritic = params.metacritic
  const metacritic_platforms = params.metacritic_platforms[0] || []
  const video = React.useRef(null);
  useEffect(() => {
    console.log(params.dlc.length)
    navigation.setOptions({
      title: "",
      headerBackground: () => (
        <Image 
        source={{uri: imgUrl}} 
        style={{width: MAX_WIDTH, height: MAX_HEIGHT * 0.1, }} resizeMode="cover" />
      )
    })
    console.log(params.dlc[0][0].background_image)
  }, [])
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={ () => navigation.goBack() } source={require("./assets/back.png")} style={styles.settings}>
      <Image source={require("./assets/back.png")} style={styles.settings} />
      </TouchableOpacity>
      <ScrollView>
        <AccordionComponent description={description} platforms={platforms} genres={genres} stores={stores} dlc={dlc}/>
      <Text style={styles.title} >{title} </Text>
      {
        released &&
        <>
        <Text style={styles.orange} >Release date:
        &nbsp;
      </Text>
      <Text style={styles.overview} >{released}</Text>
        </>
      }
      {
        clip && <Text style={styles.orange}>Clip:</Text>
      }
      {clip && <Video
        ref={video}
        style={styles.video}
        source={{
          uri: clip,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />}
      <TouchableOpacity
      style={{...styles.metacritic, backgroundColor: metacritic_platforms.length > 0 ? "rgba(204, 204, 204, 0.3)" : "FFF"}}
      activeOpacity={metacritic_platforms.length > 0 ? 0.6 : 1}
       onPress={() => metacritic_platforms.length > 0 && navigation.navigate("Metacritic", {
          data: metacritic_platforms,
          backTitle: title
        })} >
        <Text style={styles.metacritic_digit} >{metacritic} </Text>
        <Text style={{fontWeight: "bold"}} >Metascore</Text>
      </TouchableOpacity>
      {
        stores && <Text style={styles.orange}>Stores:</Text>
      }
        {stores && stores}
      <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL(website);
            }}>{website && "Homepage"} </Text>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: MAX_HEIGHT * 0.04,
    paddingHorizontal: 20,
  },
  settings:{
    width:55,
    height: 55,
  },
  title: {
    marginVertical: MAX_HEIGHT * 0.1,
    paddingVertical: 10,
    textAlign: "center",
    borderWidth: 1,
    fontSize: 30,
    fontWeight: "600",
  },
  video: {
    marginTop: MAX_HEIGHT * 0.05,
    alignSelf: 'center',
    width: MAX_WIDTH,
    height: MAX_HEIGHT / 3,
  },
  orange: {
    marginTop: 40,
    fontSize: 35,
    textAlign: "center",
    color: "orange",
    fontStyle: "italic",
  },
  overview: {
    marginVertical: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    fontSize: 25,
  },
  platform: {
    width: MAX_WIDTH,
    textAlign: "center",
    marginVertical: MAX_HEIGHT * 0.03,
    paddingVertical: MAX_HEIGHT * 0.01,
    fontSize: MAX_HEIGHT * 0.02,
    fontStyle: "italic",
    backgroundColor: "rgba(204, 204, 204, 0.3)",
  },
  hyperlinkStyle: {
    marginVertical: 20,
    color: 'blue',
    fontSize: 20
  },
  titleStyle: {
    fontSize: 20,
    margin: 10,
  },
  metacritic: {
    marginTop: MAX_HEIGHT * 0.08,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(204, 204, 204, 0.3)",
    borderRadius: 10
  },
  metacritic_digit: {
    marginRight: MAX_WIDTH * 0.06,
    backgroundColor: "#2EC413",
    padding: 25,
    fontSize: 40,
    color: "#fff",
    overflow: "hidden",
    borderRadius: 10
  }
})