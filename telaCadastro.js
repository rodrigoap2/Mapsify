import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Icon, Dimensions } from 'react-native';

export default class TelaCadastro extends React.Component {
  static navigationOptions = {
    title:'Mapsify',
  }
  render() {
    return(
      <View style={styles.container}>
        <Text style={{color:"#ffffff"}}>Tela do cadastro</Text>
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
    backgroundColor: '#212121',
  }
});