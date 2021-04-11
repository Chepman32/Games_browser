import React from 'react'
import { View, Text, StyleSheet, Linking } from 'react-native'

export default function MetacriticItem({name, url, metascore}) {
    return (
        <View style={styles.container} >
            <Text style={styles.name} >{name} </Text>
            <Text style={styles.text} onPress={() => Linking.openURL(url)} >Reviews </Text>
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
        backgroundColor: "#ccc",
        opacity: 0.5,
        borderBottomWidth: 3,
        borderColor: "#000"
      },
})