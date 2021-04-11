import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { API_KEY, MAX_HEIGHT, MAX_WIDTH } from './constants';
import { MovieCard } from './MovieCard';
export function Main({ setCurrentLang, storedLang, currentLang }) {
  useEffect(() => {
    getData()
  }, [])
  const [selectedLanguage, setSelectedLanguage] = useState()
  const [] = useState(false)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const navigation = useNavigation()
  async function getData() {
    try {
    let response =
    await fetch(
      `https://api.rawg.io/api/games?page=${page}`);
    let responseJson = await response.json();
    setMovies(responseJson.results)
  } 
  catch (error) {
    console.error(error);
  }
}
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  }
  return (
    <View style={styles.container}>
      
      <ScrollView 
      bounces={false} 
      style={{ maxWidth: MAX_WIDTH, zIndex: -1 }} 
      scrollEventThrottle={16}
      onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
        getData = async () => {
          const data = await axios.get(
            `https://api.rawg.io/api/games?page=${page}`
            )
          setMovies([...movies, ...data.data.results])
        }
        setPage(page => page + 1)
        getData()
      }
    }}>
      {
        movies.length ? movies.map(
          m =>  m.name && m.slug && m.background_image && <MovieCard
          key={Math.random()}
          title={m.title || m.name}
          slug={m.slug}
            release_date={m.release_date || m.first_air_date}
            imgUrl={m.background_image}
            id={m.id}
 />
        ) : <Text>No results</Text>
      }
      </ScrollView>
      <StatusBar hidden={true} />
    </View>
  );
}
export default function MainContainer() {
  const [storedLang, setStoredLang] = useState()
  const [currentLang, setCurrentLang] = useState()
  const setValue = async () => {
    try {
       currentLang && await AsyncStorage.setItem("LANG", currentLang.toString())
       console.log("setValue", currentLang)
    }
    catch(e) {
      console.log("setValue", e)
    }
  }
  return (
    <Main lang={storedLang}
    setLang={setStoredLang}
    currentLang={currentLang}
    setCurrentLang={(value) => {
      setCurrentLang(value)
    }} />
  )
}
const styles = StyleSheet.create({
  container: {
    maxWidth: MAX_WIDTH,
    height: MAX_HEIGHT,
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settings:{
    width:55,
    height: 55,
  },
  item: {
    padding: 10,
    backgroundColor: "tomato"
  },
  cardContainer: {
    minWidth: MAX_WIDTH,
    height: MAX_HEIGHT * 0.6,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
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
  settings: {
    position: "absolute",
    top: MAX_WIDTH * 0.2,
    right: MAX_WIDTH * 0.2,
    zIndex: 1000,
  },
  icon: {
    width: MAX_WIDTH * 0.2,
    height: MAX_WIDTH * 0.2
  },
  text: {
    fontSize: 60
  }
});
