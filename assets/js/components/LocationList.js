import React from 'react';
import LocationItem from './LocationItem';

export default class LocationList extends React.Component {
	render() {
		const locations = this.props.locations.map((l) => {
			const active = this.props.activeLocationAddress === l.address;
			return (
				<LocationItem key={`${l.address}${l.timestamp}`} address={l.address} timestamp={l.timestamp} active={active} onClick={this.props.onClick} />
			);
		});

		if (!locations.length) {
			return null;
		}

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<span className="list-group-item active">Saved locations</span>
				{locations}
			</div>
		);
	}
}

LocationList.propTypes = {
	locations: React.PropTypes.array,
	activeLocationAddress: React.PropTypes.string,
	onClick: React.PropTypes.func,
};
