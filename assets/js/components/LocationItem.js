import React from 'react';
import moment from 'moment';

export default class LocationItem extends React.Component {
	handleClick = () => {
		this.props.onClick(this.props.address);
	}

	render () {
		let link = 'list-group-item';
		if (this.props.active) {
			link += ' active-location';
		}
		return (
			<a className={link} onClick={this.handleClick}>
				{this.props.address}
				<span className='createdAt'>{moment(this.props.timestamp).fromNow()}</span>
				<span className='glyphicon glyphicon-menu-right'></span>
			</a>
		)
	}
}