import HTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { Video, AVPlaybackStatus } from 'expo-av';
import React, { useState, useEffect } from "react"
import { Image, Linking, StyleSheet, Text, View } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { CompanyItem } from "./CompanyItem"
import { MAX_HEIGHT, MAX_WIDTH, setGenreIcon, setIcon } from "./constants"
import AccordionComponent from "./Accordion";
import { SimilarItem } from "./SimilarItem";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
var strip_tags = require("strip_tags");
export const MovieInfo = ({ route }) => {
  const [status, setStatus] = React.useState({});
  const {params} = route
  const title = params.title
  let description = params.description
  description = (
    <Text style={[styles.overview, themeTextStyle]} ><HTML source={{ html: description }} style={[styles.overview, themeTextStyle]} /></Text>
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
        logo={setGenreIcon(g.name)}
        />) || []
    const platforms = params.platforms[0].map(p => <View key={p.platform.id} style={{width: MAX_WIDTH}} >
      <Text style={[styles.platform, themeTextStyle]}
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
    const clip = params.clip
  const imgUrl = params.imgUrl
  const metacritic = params.metacritic
  const metacritic_platforms = params.metacritic_platforms[0] || []
  const reddit = params.reddit
  const video = React.useRef(null);
  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerBackground: () => (
        <Image 
        source={{uri: imgUrl}} 
        style={{width: MAX_WIDTH, height: MAX_HEIGHT * 0.1, }} resizeMode="cover" />
      )
    })
  }, [])
  const navigation = useNavigation()
  let colorScheme = useColorScheme()
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  useEffect(() => {
  }, [])
  return (
    <View style={[styles.container, themeContainerStyle]}>
      <TouchableOpacity onPress={ () => navigation.goBack() } source={require("./assets/back.png")} style={styles.settings}>
      <Image source={require("./assets/back.png")} style={styles.settings} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} >
      <Text style={[styles.title, themeTextStyle]} >{title} </Text>
        <AccordionComponent description={description} platforms={platforms} genres={genres} stores={stores} />
      {
        released &&
        <>
        <Text style={[styles.orange, themeTextStyle]} >Release date:
        &nbsp;
      </Text>
      <Text style={[styles.overview, themeTextStyle]} >{released}</Text>
        </>
      }
      {
        clip && <Text style={[styles.orange, themeTextStyle]}>Clip:</Text>
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
      <TouchableOpacity onPress={() => Linking.openURL(reddit)} >
      <Image
      style={styles.reddit} resizeMode="contain"
      source={{uri: "https://cdn.vox-cdn.com/thumbor/8i-wKl-12cdGNC4U4LF0tzMh3xM=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/uploads/chorus_image/image/37152424/reddit_logo_640.0.jpg"}}/>
      </TouchableOpacity>
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
    backgroundColor: "#fff"
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
  reddit: {
    width: MAX_WIDTH,
    height: MAX_HEIGHT * 0.1,
    marginTop: MAX_HEIGHT * 0.1,
    overflow: "hidden",
    borderRadius: 20
  },
  metacritic: {
    marginTop: MAX_HEIGHT * 0.08,
    alignItems: "center",
    flexDirection: "row",
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
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#fff',
  },
})