
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { event } from "../Home/HomeScreen"
import { View, Text } from 'react-native'
import styles from './styles' // Import styles

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 2,
    longitudeDelta: 2,
}

type MapScreenRouteProp = RouteProp<{ params: { events: event[] } }, 'params'>;

export default function Map() {
    const route = useRoute<MapScreenRouteProp>()
    const events = route.params.events
    
    return (
        <View style={styles.container}>
            <MapView
                initialRegion={INITIAL_REGION}
                showsUserLocation
                showsMyLocationButton
                provider={PROVIDER_GOOGLE}
            >
                {events.map((event, index) => (
                    <Marker
                        key={index}
                        title={event.title}
                        coordinate={{ latitude: event.latitude, longitude: event.longitude }}
                        onPress={() => alert(event.title)}
                    >
                        <Callout onPress={() => console.log("Callout pressed:", event.title)}>
                            <View style={styles.calloutView}>
                                <Text style={styles.calloutTextTitle}>{event.title}</Text>
                                <Text style={styles.calloutTextLocation}>{event.location}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
}
