import { TimePicker, DatePicker, WheelPicker } from 'react-native-wheel-picker-android'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

const wheelPickerData = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

class MyPicker extends Component {
  state = {
    selectedItem: 0,
  }

  onItemSelected = selectedItem => {
    this.setState({ selectedItem })
  }

  onPress = () => {
    this.setState({ selectedItem: 3 })
  }

  render() {
    return (
      <View style={styles.container}>
      <Button title={'Select third element'} onPress={this.onPress}/>
      <Text>Selected position: {this.state.selectedItem}</Text>
      <WheelPicker 
        selectedItem={this.state.selectedItem}
        data={wheelPickerData} 
        onItemSelected={this.onItemSelected}/>
      </View>
    );
  }
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
module.exports = MyPicker;