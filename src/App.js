import React, { Component } from 'react';
import logo from './app-logo.png';
import './App.css';
import MapView from './MapView';
import ListView from './ListView';

class App extends Component {
    state = {
        markers: [],
        locations:[],
        center:[],
        zoom: 13,
        updateParentState: obj => {
            this.setState(obj);
        }
    }

    componentDidMount() {
        this.getVenues();
    }
    // requesting venue details from foursquare API
    getVenues = () => {
        const endPoint = "https://api.foursquare.com/v2/venues/search?";
        const parameters = {
            client_id: "MI1Z5W4IBL43PB42IPIZUDJ5IXV02YO3EJ0SXE4BZ1RNUMDF",
            client_secret: "XSVCLYLIJNFF1AXCUWNN2BTXWQKGB3JFBO0C5ORVJWDPI24L",
            v: 20181120,
            query: "restaurant",
            near: "indore",
            limit: 10
        };
        fetch(endPoint + new URLSearchParams(parameters),{method: 'GET'}).then(response => response.json()).then(response =>  {
            const center = response.response.geocode.feature.geometry.center;
            const locations = response.response.venues;
            const markers =locations.map(location=> {
                    return {
                        lat: location.location.lat,
                        lng: location.location.lng,
                        isOpen: false,
                        isVisible: true,
                        id: location.id
                    }
                } );
            this.setState({ locations:locations,markers:markers,center:center });
        }).catch(err => {
            console.log(err);
        });
    };

    getVenueDetails = location => {
        const endPoint = "https://api.foursquare.com/v2/venues/${venue.id}`?";
        const parameters = {
            client_id: "MI1Z5W4IBL43PB42IPIZUDJ5IXV02YO3EJ0SXE4BZ1RNUMDF",
            client_secret: "XSVCLYLIJNFF1AXCUWNN2BTXWQKGB3JFBO0C5ORVJWDPI24L",
            v: 20181120,
        };
        fetch(endPoint,{method: 'GET'}).then(response => response.json()).then(response =>{
                const newVenue = Object.assign(location, response.response.venue);
                this.setState({locations: Object.assign(this.state.locations,newVenue)});
                console.log(newVenue);
            }).catch(err => {
                console.log(err);
        });
    }

    closeAllMarkers = () => {
        const markers = this.state.markers.map(marker => {
            marker.isOpen = false;
            return marker;
        });
        this.setState({markers: markers});
    }

    onMarkerClick = (marker) => {
        this.closeAllMarkers();
        marker.isOpen = true;
        this.setState({markers: Object.assign(this.state.markers,marker)});
        const location = this.state.locations.find(loc => loc.id === marker.id);
        this.getVenueDetails(marker.id);
    }
    onListClick = location => {
        const marker =  this.state.markers.find(marker => marker.id === location.id);
        this.onMarkerClick(marker);
    }

gm_authFailure() {
    window.alert("Google Maps error!!!");
}

togglesidebar = () => {
    let element = document.getElementById("main");
    console.log(111);
   if(element)
       element.classList.toggle("ml-main");
}


    render() {
          return (
                <div className="App">
                    <header className="app-header">
                        <div className="app-logo">
                            <div className="logo"><img src={logo} width="50" height="50" alt="neighbourhood map logo"/></div>
                            <div className="app-title"><span>Neighborhood Map</span></div>
                        </div>
                        <div className="menu-container" onClick={this.togglesidebar}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                    </header>
                    <div className="app-body">
                        <div className="sidebar">
                            <ListView
                                {...this.state}
                                onListClick={(location)=>this.onListClick}
                            />
                        </div>
                        <main id="main" className="main ml-main">
                            <div id="map">
                                <MapView {...this.state}
                                    onMarkerClick={(marker)=>this.onMarkerClick}
                                    role="application"
                                    aria-hidden="true" />
                            </div>
                        </main>
                    </div>
                </div>
          );
    }
}

export default App;
