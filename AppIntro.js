import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { MAX_WIDTH } from './constants';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginBottom: 50,
    fontSize: MAX_WIDTH * 0.06,
    textAlign: "center",
    fontWeight: "500"
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //[...]
});

const slides = [
  {
    key: Math.random().toString(),
    title: "Welcome to \n Movie Browser Pro!",
    image: require("./assets/settings.png")
  },
  {
    key: Math.random().toString(),
    title: "Here you'll can find a thousands of movies and TV shows",
    image: require("./assets/settings.png")
  },
  {
    key: Math.random().toString(),
    title: "In MBP, we have collected all the films in the entire history of cinematography",
    image: require("./assets/settings.png")
  },
  {
    key: Math.random().toString(),
    title: "Just tap below button and enjoy!",
    image: require("./assets/settings.png")
  },
]

function AppIntroContainer() {
  const navigation = useNavigation()
  return (
    <AppIntro navigation={navigation}/>
  )
}

export default class AppIntro extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide} >
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
      </View>
    );
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialCommunityIcons name="home" color={"#ccc"} size={24} />
      </View>
    );
  };
  render() {
    return (
      <AppIntroSlider
      renderItem={this._renderItem}
        data={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        showNextButton={false}
        onDone={() => this.props.navigation.navigate("Main") }
      />
    );
  }
}