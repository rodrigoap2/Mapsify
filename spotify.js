var SpotifyWebApi = require('spotify-web-api-node');

const scopes = [
    "user-read-private",
     "user-read-email"
];

var credentials = {
  clientId: 'fa0bb4ef26804051a045aaef2fcba4b2',
  clientSecret: 'af0d0cbcc1404412994107efa6462256',
  redirectUri: "https://auth.expo.io/@cdbm/Mapsify"
};

var spotifyApi = new SpotifyWebApi(credentials);

export default spotifyApi;