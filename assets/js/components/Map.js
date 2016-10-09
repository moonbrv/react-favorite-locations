import React from 'react';
import GMaps from 'gmaps';

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

		const map = new GMaps({
			el: '#map',
			lat: this.props.lat,
			lng: this.props.lng,
		});
		map.addMarker({
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
