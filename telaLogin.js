import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, ScrollView, ToastAndroid} from 'react-native';
import { AuthSession } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { toStatement } from '@babel/types';
var SpotifyWebApi = require('spotify-web-api-node');

const CLIENT_ID = 'fa0bb4ef26804051a045aaef2fcba4b2';
export const scopes = [
    "user-read-private",
     "user-read-email"
];

var credentials = {
  clientId: 'fa0bb4ef26804051a045aaef2fcba4b2',
  clientSecret: 'af0d0cbcc1404412994107efa6462256',
  redirectUri: "https://auth.expo.io/@/Mapsify"
};


var spotifyApi = new SpotifyWebApi(credentials);

export default class App extends Component {
  state = {
    userInfo: null,
    didError: false,
    acess_token: null,
    refresh_token: "nada"
  };

  handleSpotifyLogin = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let results = await AuthSession.startAsync({
      authUrl: `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user-read-email&response_type=token`
    });
    if (results.type !== 'success') {
      console.log(results.type);
      this.setState({ didError: true });
    } else {
      spotifyApi.setAccessToken(results.params.access_token);
      this.setState({acess_token : results.params.access_token })
      const userInfo = await axios.get(`https://api.spotify.com/v1/me`, {
        headers: {
          "Authorization": `Bearer ${results.params.access_token}`
        }
      });
      this.setState({ userInfo: userInfo.data });
      ToastAndroid.show(JSON.stringify(results.params.access_token), ToastAndroid.LONG);
      this.props.navigation.navigate("TelaMapas");
    }
  };

  displayError = () => {
    return (
      <View style={styles.userInfo}>
        <Text style={styles.errorText}>
          There was an error, please try again.
        </Text>
      </View>
    );
  }

  displayResults = () => {
    { return this.state.userInfo ? (
      <View style={styles.userInfo}>
        <Image
          style={styles.profileImage}
          source={ {'uri': this.state.userInfo.images[0].url} }
        />
        <View>
          <ScrollView>
          <Text style={styles.userInfoText}> Acess Token</Text>
            <Text style={styles.userInfoText}>
              {this.state.acess_token}
            </Text>
          </ScrollView>
        </View>
      </View>
    ) : (
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>
          Login to Spotify to see user data.
        </Text>
      </View>
    )}
  }

  render() {
    return (

      <View style={styles.container}>
          
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSpotifyLogin}
          disabled={this.state.userInfo ? true : false}
        >
          <Text style={styles.buttonText}>
            Login with Spotify
          </Text>
        </TouchableOpacity>
        {this.state.didError ?
          this.displayError() :
          this.displayResults()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#2FD566',
    padding: 20
  },
  buttonText: {
    color: '#000',
    fontSize: 20
  },
  userInfo: {
    height: 250,
    width: 200,
    alignItems: 'center',
  },
  userInfoText: {
    color: '#fff',
    fontSize: 18
  },
  errorText: {
    color: '#fff',
    fontSize: 18
  },
  profileImage: {
    height: 64,
    width: 64,
    marginBottom: 32
  }
});