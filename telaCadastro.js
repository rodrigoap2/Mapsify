import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Icon, Dimensions, TextInput } from 'react-native';

export default class TelaCadastro extends React.Component {
  static navigationOptions = {
    title:'Mapsify',
  }

  clicar = () => {
    
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Diga o nome do local"
        placeholderTextColor="#212121"
        onChangeText={text => this.state.name = text}
      />
      <TextInput
        style={styles.input}
        placeholder="Gêneros musicais escutados nesse local"
        placeholderTextColor="#212121"
        onChangeText={text => this.state.generos = text}
      />
      <TextInput
        style={styles.input}
        placeholder="Artistas escutados nesse local"
        placeholderTextColor="#212121"
        onChangeText={text => this.state.artistas = text}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor="#212121"
        onChangeText={text => this.state.endereco = text}
      />
      <TouchableOpacity style={styles.botaoLogin}>
          <Text style={{color:'#ffffff', fontWeight:'bold', fontSize: 18,}} onPress={this.clicar()}> Cadastrar Local </Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth:1,
    borderColor:'#000000',
    backgroundColor:'#C4C4C4',
    width:300,
    height:50,
    borderRadius:20,
    marginBottom:30,
    textAlign:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent:'center',
    alignItems:'center'
  },
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
  }
});