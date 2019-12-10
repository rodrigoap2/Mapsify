import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Icon, Dimensions } from 'react-native';

import  MapView  from 'react-native-maps'

export default class TelaMapas extends React.Component {
  static navigationOptions = {
    title:'Mapsify',
  }
  render() {
  	return(
  		<View style={styles.container}>
  			<Text style={{color:"#ffffff"}}>Tela dos mapasss</Text>
        <MapView
              style=""
              loadingEnabled={true}
              region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
              }}
             >
        </MapView>       
  			<TouchableOpacity style={styles.botaoLogin}>
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
  }
});