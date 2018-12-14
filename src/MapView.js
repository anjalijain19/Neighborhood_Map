import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
const defaultCenter={  lat: 22.719568, lng: 75.857727 };
const MyMapComponent = withScriptjs(
        withGoogleMap(props => (
        <GoogleMap
            defaultZoom={13}
            zoom={props.zoom}
            defaultCenter={defaultCenter}
            center={props.center}>
            {
                    props.markers && props.markers .filter(marker => marker.isVisible).map((marker, id, arr) => {
                    let venInfo = props.locations.find(ven => ven.id === marker.id);

                let pos={lat:parseFloat(marker.lat), lng: parseFloat(marker.lng)};
                console.log(pos);
                return (
                        <Marker
                            key={marker.id}
                            position={pos}
                            onClick={(marker) => props.onMarkerClick}
                            animation={arr.length === 1 ? window.google.maps.Animation.BOUNCE : window.google.maps.Animation.DROP}
                        >
                        {
                            marker.isOpen && (
                            <InfoWindow>
                                <React.Fragment>
                                    <p>{venInfo.name}</p>
                                    <br/>
                                    <p>{venInfo.location.formattedAddress}</p>
                                </React.Fragment>
                            </InfoWindow>
                        )}
                        </Marker>
                    );
                })
            }
        </GoogleMap>
    ))
);

export default class Map extends Component {
    render() {
        return (
            <MyMapComponent
                {...this.props}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAzdTmzj3F8pp0MY4SlkfdgbcqJzqG9-NY"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%`, width: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}
