import * as React from 'react';
import { MapView } from 'react-native-maps'


export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            // ownPosition: {
            //     lat: 47.444,
            //     lng: -122.176
            // },
            // maps: (<Map
            //   google={this.props.google}
            //   zoom={8}
            //   style=""
            //   initialCenter={{...state.ownPosition}}
            // />)
        };
    }

    render() {
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //       var pos = {
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude
        //       }; 
        //       this.setState({ownPosition: pos});    
        //    })  
        // }
        // return (
        //     <div>
        //         {this.state.maps}
        //     </div>
        // );
        return (
            
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
            
             
            
            );
      }
}


