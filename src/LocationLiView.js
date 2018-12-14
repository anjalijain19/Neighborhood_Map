import React, { Component } from 'react';

class LocationLiView extends Component {
    render() {
        return (
            <ul>
                {this.props.locations.map((marker) => <li className="restaurant-li" key={marker.id} onClick={marker=>this.props.onListClick} ><p>{marker.name}</p> </li>)}
            </ul>
        );
    }
}

export default LocationLiView;