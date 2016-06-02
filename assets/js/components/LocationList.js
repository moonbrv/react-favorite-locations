//Description: CurrentLocation presents the currently visited address in the map.
//Addresses can be added or removed from favorites by clicking the star icon.
//
// This Component takes the array with favorite locations that was passed to it,
// creates a LocationItem object for each and presents it in a list group.

import {Component} from 'react';
import LocationItem from './LocationItem';

export default class LocationList extends Component {
	render() {
		let self = this;
		let locations = this.props.locations.map( (l) => {
			let active = self.props.activeLocationAddress == l.address;
			// Notice that we are passing the onClick callback of this
			// LocationList to each LocationItem.
			
			return <LocationItem key={'' + l.address + l.timestamp} address={l.address} 
			timestamp={l.timestamp} active={active} onClick={self.props.onClick} />
		});

		if(!locations.length) {
			return null;
		}

		return(
			<div className='list-group col-xs-12 col-md-6 col-md-offset-3'>
				<span className='list-group-item active'>Saved locations</span>
				{locations}
			</div>
		)
	}
}