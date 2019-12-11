import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Icon, Dimensions, TextInput, ToastAndroid } from 'react-native';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

export default class TelaCadastro extends React.Component {
  static navigationOptions = {
    title:'Mapsify',
  }

  criarPlaylist = async (nome) => {
    var user =  await AsyncStorage.getItem('userId');
    var token = await AsyncStorage.getItem('access_token');
    var data = {'name': nome ,'description':'New playlist description','public':true};
    var d = JSON.stringify(data); 
    
    await axios({
      url: `https://api.spotify.com/v1/users/${user}/playlists`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data : d
    }).catch(function (err){
      ToastAndroid.show(JSON.stringify(err), ToastAndroid.LONG)
    })
  }
    
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      endereco: '',
      artistas: '',
      generos: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Diga o nome do local"
        placeholderTextColor="#212121"
        onChangeText={text => this.setState({nome: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Gêneros musicais escutados nesse local"
        placeholderTextColor="#212121"
        onChangeText={text => this.setState({generos: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Artistas escutados nesse local"
        placeholderTextColor="#212121"
        onChangeText={text => this.setState({artistas: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor="#212121"
        onChangeText={text => this.setState({endereco: text})}
      />
      <TouchableOpacity style={styles.botaoLogin}>
          <Text style={{color:'#ffffff', fontWeight:'bold', fontSize: 18,}} onPress={() => {
            ToastAndroid.show(this.state.nome  + ' ' + this.state.generos + ' ' +this.state.artistas + ' ' + this.state.endereco,300);
          }}> Cadastrar Local </Text>
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