import React from 'react';
import fromTime from './../utils/fromTime';

export default class LocationItem extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.address);
	}

	render() {
		let link = 'list-group-item';
		if (this.props.active) {
			link += ' active-location';
		}
		return (
			<button className={link} onClick={this.handleClick}>
				{this.props.address}
				<span className="createdAt">{fromTime(this.props.timestamp)}</span>
				<span className="glyphicon glyphicon-menu-right" />
			</button>
		);
	}
}

LocationItem.propTypes = {
	onClick: React.PropTypes.func,
	active: React.PropTypes.bool,
	address: React.PropTypes.string,
	timestamp: React.PropTypes.number,
};
