import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme'
import MetacriticItem from './MetacriticItem'

export default function MetacriticPlatform({route}) {
    let colorScheme = useColorScheme()
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            title: route.params.backTitle
        })
        console.log(colorScheme)
    }, [])
    const {data} = route.params
    return (
        <View style={[styles.container, themeContainerStyle]} >
            {
                data.map((d) => <MetacriticItem key={d.platform.name} name={d.platform.name} url={d.url}/> )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: "center",
        alignItems: "center"
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
        color: '#d0d0c0',
      },
})