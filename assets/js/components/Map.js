import React from 'react';
import gmaps from 'gmaps';

export default class Map extends React.Component {
	componentDidMount() {
		this.componentDidUpdate();
	}
	componentDidUpdate() {
		if ((this.lastLat === this.props.lat) && (this.lastLng === this.props.lng)) {
			return;
		}
		this.lastLat = this.props.lat;
		this.lastLng = this.props.lng;

		gmaps({
			el: '#map',
			lat: this.props.lat,
			lng: this.props.lng,
		});
	}

	render() {
		return (
			<div className="map-holder">
				<p>Loading...</p>
				<div id="map" />
			</div>
		);
	}
}

Map.propTypes = {
	lat: React.PropTypes.number,
	lng: React.PropTypes.number,
};
