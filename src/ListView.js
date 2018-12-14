import React, { Component } from 'react';
import LocationLiView from './LocationLiView';

class ListView extends Component {
    state = {query:""};

    //filter the location based on query
    onFilter = () => {
        if(this.state.query.trim() !== "") {
            const locations = this.props.locations.filter(location =>location.name.toLowerCase().includes(this.state.query.toLowerCase()));
            return locations;
        }
        return this.props.locations;
    }

    handleQueryChange = event => {
        this.setState({ query: event.target.value});
            const markers = this.props.locations.map(location => {
            const isfound = location.name.toLowerCase().includes(event.target.value.toLowerCase());
            let marker = this.props.markers.find(marker => marker.id === location.id);
            if(isfound) {
                marker.isVisible = true;
            }
            else {
                marker.isVisible = false;
            }
            return marker;
        });

        this.props.updateParentState({ markers });
    }

    render() {
        return (
            <div className="marker-list">
                <div className="filters"><input type="text" onKeyUp={this.handleQueryChange} placeholder="Filter"/></div>
                <div>
                    <LocationLiView
                        {...this.props}
                        locations={this.onFilter()}
                    />
                </div>
            </div>
        );
    }
}

export default ListView;