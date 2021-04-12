import React from 'react'
import { View, Text, StyleSheet, Linking } from 'react-native'
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme'

export default function MetacriticItem({name, url, metascore}) {
    let colorScheme = useColorScheme()
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    return (
        <View style={styles.container} >
            <Text style={[styles.name, themeTextStyle]} >{name} </Text>
            <Text style={[styles.text, themeTextStyle]} onPress={() => Linking.openURL(url)} >Reviews </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    },
    name: {
        fontSize: 40,
        fontWeight: "600"
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
        backgroundColor: "rgba(204, 204, 204, 0.3)",
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