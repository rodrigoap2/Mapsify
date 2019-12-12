import * as React from 'react';
import {Platform, Button, Text, View, StyleSheet, TouchableOpacity, Icon, Dimensions, ToastAndroid, WebView, Linking  } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import  MapView from 'react-native-maps'
import spotifyApi from './spotify';




export default class TelaMapas extends React.Component {
  static navigationOptions = {
    title:'Mapsify',
    headerRight: (<View/>),
  }
  constructor(props) {
    super(props);
    this.state = {
      ownPosition:
      {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta:0.025,
        longitudeDelta:0.025
      },
      markers: [
        
      ]
    };
  }


  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
      this._getPlacesAsync();
    }
  }
  //
  _getPlacesAsync = async () => {
    fetch('https://mapsifyserver.herokuapp.com/places', {method: 'GET'}).then(res => res.json()).then(collection => {
        collection.forEach(place => {
            const places = this.state.markers;
            let index = 0;
            places.push(
              (<MapView.Marker 
              coordinate={
                  {
                    latitude: place.lat,
                    longitude: place.lng,
                    latitudeDelta:0.025,
                    longitudeDelta:0.025
                  }
              }
              key={index++}
              title={place.name}
              description={"description"}
              onCalloutPress={() => Linking.openURL(place.playlistLink).catch(err => console.log(err))}
            >
            <MapView.Callout>
              <View>
                <Text>{place.name}</Text>
                <Text>Uma playlist feita só para esse lugar.</Text>
                <Text>Clique acessar!</Text>
              </View>
            </MapView.Callout>
            </MapView.Marker>)
            )
            this.setState({markers:places});
        });
    })
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    const curr = this.state.ownPosition;
    this.setState({ownPosition: {...curr, latitude: location.coords.latitude, longitude: location.coords.longitude}   });
  
  };

  render() {
    const markers = this.state.markers;
  	return(
     
  		<View style={styles.container}>
  			<Text style={{color:"#ffffff"}}>Tela dos mapasss</Text>
        <MapView
              showsUserLocation={true}
              style={styles.map}
              loadingEnabled={true}
              region={
              this.state.ownPosition
              }
             >
             {markers}
        </MapView>    
           <View style={styles.bottom}>
	  			<TouchableOpacity style={styles.botaoLogin}>  
	          		<Text style={{color:'#ffffff', fontWeight:'bold', fontSize: 18,}} onPress={() => {this.props.navigation.navigate("TelaCadastro");}}> Tela do cadastro</Text>
	        	</TouchableOpacity>
            <TouchableOpacity style={styles.botaoLogin}>  
	          		<Text style={{color:'#ffffff', fontWeight:'bold', fontSize: 18,}} onPress={this.play}> Criar Playlist</Text>
	        	</TouchableOpacity>
        	</View>
  		</View>
  	);
  }
}

const styles = StyleSheet.create({
  botaoLogin: {
    borderWidth:1,
    borderColor:'#1db954',
    backgroundColor:'#1db954',
    justifyContent:'center',
    textAlign: 'center',
    width:200,
    height:50,
    borderRadius:20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
   },
   bottom: {
	  flex: 1,
	  justifyContent: 'flex-end',
	  marginBottom: 36
	}
});