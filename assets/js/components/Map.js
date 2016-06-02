import React, {Component} from 'react';

export default class Map extends Component {
	componentDidMount() {
		this.componentDidUpdate();
	}
	componentDidUpdate() {
		if ((this.lastLat == this.props.lat) && (this.lastLng == this.props.lng)) {
			return;
		}
		this.lastLat == this.props.lat;
		this.lastLng == this.props.lng;

		let map = new GMaps({
			el: '#map',
			lat: this.props.lat,
			lng: this.props.lng
		});
		map.addMarker({
			lat: this.props.lat,
			lng: this.props.lng
		})
	}

	render () {
		return (
			<div className='map-holder'>
				<p>Loading...</p>
				<div id='map'></div>
			</div>
		)
	}
}