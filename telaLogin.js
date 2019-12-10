import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Icon, Dimensions } from 'react-native';
import Constants from 'expo-constants';
// You can import from local files
import AssetExample from './components/AssetExample';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={{color: '#ffffff', textAlign: 'center'}}> Mapsify {"\n"}{"\n"}{"\n"}</Text>
        <TouchableOpacity style={styles.botaoLogin}>
          <Text style={{color:'#ffffff', fontWeight:'bold', fontSize: 18,}}> LOGIN </Text>
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
    width:100,
    height:50,
    borderRadius:20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + Dimensions.get('window').height * 0.4,
    backgroundColor: '#212121',
  }
});
