import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MetacriticItem from './MetacriticItem'

export default function MetacriticPlatform({route}) {
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            title: route.params.backTitle
        })
    }, [])
    const {data} = route.params
    return (
        <View style={styles.container} >
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
    }
})