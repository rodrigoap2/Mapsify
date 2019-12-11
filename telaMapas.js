import * as React from 'react';
import {Platform, Button, Text, View, StyleSheet, TouchableOpacity, Icon, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import  MapView  from 'react-native-maps'

export default class TelaMapas extends React.Component {
  static navigationOptions = {
    title:'Mapsify',
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
      }
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const curr = this.state.ownPosition;
    this.setState({ownPosition: {...curr, latitude: location.coords.latitude, longitude: location.coords.longitude}   });
  };

  render() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       var pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       }; 
  //       this.setState({ownPosition: pos});    
  //    })  
  // }

  	return(
     
  		<View style={styles.container}>
  			<Text style={{color:"#ffffff"}}>Tela dos mapasss</Text>
        <MapView
              style={styles.map}
              loadingEnabled={true}
              region={
              this.state.ownPosition
              }
             >
        </MapView>    
           
  			<TouchableOpacity style={styles.botaoLogin}>
        <Text>{this.state.errorMessage}</Text>   
          		<Text style={{color:'#ffffff', fontWeight:'bold', fontSize: 18,}} onPress={() => {this.props.navigation.navigate("TelaCadastro");}}> Tela do cadastro</Text>
        	</TouchableOpacity>
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
   }
});