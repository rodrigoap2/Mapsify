import * as React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';



class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maps: (<Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            />),
            ownPosition: {
                lat: 47.444,
                lng: -122.176
            }
        };
    }

    render() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }; 
              this.setState({ownPosition: pos});    
           })  
        }
        return (
            <div>
                {this.state.maps}
            </div>
        );
      }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyDtVroWGcgsHg6Jt97laHORTZfs4UpzMzk'
  })(MapContainer);