import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { MAX_HEIGHT, MAX_WIDTH } from './constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

class Loader extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    const { navigation } = this.props
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Main")} style={styles.animationContainer}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: MAX_WIDTH / 3,
            height: MAX_HEIGHT / 3,
    alignItems: 'center',
    justifyContent: 'center',
          }}
          source={require('./assets/icons-loading.json')}
        />
      </TouchableOpacity>
    );
  }
}
export default function Spinner() {
  const navigation = useNavigation()
  return <Loader navigation={navigation} />
}
const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: "center",
    flex: 1,
  },
});