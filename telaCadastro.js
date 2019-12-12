import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Icon, Dimensions, TextInput, ToastAndroid } from 'react-native';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import Geocoder from 'react-native-geocoding';
const GOOGLE_MAPS_APIKEY = 'AIzaSyDtVroWGcgsHg6Jt97laHORTZfs4UpzMzk';

export default class TelaCadastro extends React.Component {
  static navigationOptions = {
    title:'Mapsify',
    headerRight: (<View/>),
  }

  criarPlaylist = async (nome) => {
    var user =  await AsyncStorage.getItem('userId');
    var token = await AsyncStorage.getItem('access_token');
    var data = {'name': nome ,'description':'New playlist description','public':true};
    var d = JSON.stringify(data); 
    
    return await axios({
      url: `https://api.spotify.com/v1/users/${user}/playlists`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data : d
    }).then(function (res){
      return {
        id : res.data.id,
        url : res.data.external_urls.spotify 
      }
    }).catch(function (err){
      ToastAndroid.show("erro na criação de playlist", ToastAndroid.LONG)
    })
  }

  getArtistId = async (artist_tag) => {
    var token = await AsyncStorage.getItem('access_token');
    return await axios({
      url: ` https://api.spotify.com/v1/search?q=${encodeURIComponent(artist_tag)}&type=artist`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(function (res){
        return (res.data.artists.items[0].id)
    }).catch(function (err){
      ToastAndroid.show("erro pra pegar id de artista", ToastAndroid.LONG)
    })
  }

  getMusicByGenre = async (genre_tag) => {
    var token = await AsyncStorage.getItem('access_token');
    return await axios({
      url: `https://api.spotify.com/v1/recommendations?seed_genres=${genre_tag}&market=BR&min_popularity=30`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(function (res){
      var musicas = []
      res.data.tracks.forEach(element => {
          musicas.push(element.uri)
      });
      return musicas;
    }).catch(function (err){
      ToastAndroid.show("erro no genero", ToastAndroid.LONG)
    })
  }


  getArtistTop10 = async (artist_id) => {
    var token = await AsyncStorage.getItem('access_token');
    return await axios({
        url : `https://api.spotify.com/v1/artists/${artist_id}/top-tracks?country=BR`,
        method : 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(function (result){
        var musicas = {uris : []}
        result.data.tracks.forEach(function (song){
            musicas.uris.push(song.uri)
        })
        return musicas;
    }).catch(function (err){
      ToastAndroid.show("erro nos top 10 dos artistas", ToastAndroid.LONG)
    })
  
  }

  addMusicsToPlaylist = async (playlist_id, musics) => {
    var token = await AsyncStorage.getItem('access_token');
    return await axios({
      url : `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      method : 'post',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      data : musics
    }).then(function (res){
      return res.status;
    }).catch(function (err){
      ToastAndroid.show("erro pra adicionar musicas", ToastAndroid.LONG)
    })
  }

  lansandoABraba = async () => {
    var getLatLng = fetch('http://open.mapquestapi.com/geocoding/v1/address?key=8z2jVfQKrkEunA3Cv50A7ERkYYFXQAmc&location=' + this.state.endereco,{method:'GET'}).then(res => res.json()).then(obj => {this.setState({lat:obj.results[0].locations[0].latLng.lat, lng:obj.results[0].locations[0].latLng.lng})})
    await getLatLng;
    console.log(lat)
    const {nome, lat, lng, artistas, generos} = this.state;

    var playlist = await this.criarPlaylist(nome);
    var artistaID = await this.getArtistId(artistas);
    var musicasArtista = await this.getArtistTop10(artistaID);
    var musicaGeneros = await this.getMusicByGenre(generos);
    

    await this.addMusicsToPlaylist(playlist.id, musicaGeneros);
    await this.addMusicsToPlaylist(playlist.id, musicasArtista);
    
    console.log(playlist)

    var dale = {
      name : nome,
      lat : lat,
      lng: lng,
      playlistLink : playlist.url
    }

    var dele = JSON.stringify(dale);
    console.log(dele)

    await axios({
      url : 'https://mapsifyserver.herokuapp.com/place',
      method : 'post',
      headers : {
        'Content-Type': 'application/json'
      },
      data : dele
    }).then(function (res){
      console.log("dale")
    })

  }


  constructor(props) {
    super(props);
    this.state = {
      name: '',
      endereco: '',
      artistas: '',
      generos: '',
      lat:'',
      lng:'',
      playlistLink:''
    };
  }


  render() {
    return (
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Diga o nome do local"
        placeholderTextColor="#212121"
        onChangeText={text => this.setState({name: text})}
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
          <Text style={{color:'#ffffff', fontWeight:'bold', fontSize: 18,}} onPress={this.lansandoABraba}> Cadastrar Local </Text>
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