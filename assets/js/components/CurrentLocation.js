import React from 'react';

export default class CurrentLocation extends React.Component {
	constructor(props) {
		super(props);

		this.toggleFavorite = this.toggleFavorite.bind(this);
	}

	toggleFavorite() {
		this.props.onFavoriteToggle(this.props.address);
	}

	render() {
		const addButton = {
			text: 'Add to favourites',
			class: 'btn btn-success',
		};
		if (this.props.favorite) {
			addButton.text = 'Remove from favourites';
			addButton.class = 'btn btn-danger';
		}
		return (
			<div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 current-location">
				<div className="row">
					<div className="col-xs-12 col-sm-7 col-md-7 text-center">
						<h4>{this.props.address}</h4>
					</div>
					<div className="col-xs-12 col-sm-5 col-md-5 text-center">
						<span
							className={addButton.class}
							onClick={this.toggleFavorite}
							aria-hidden="true"
						>
							{addButton.text}
						</span>
					</div>
				</div>

			</div>
		);
	}
}

CurrentLocation.propTypes = {
	address: React.PropTypes.string,
	onFavoriteToggle: React.PropTypes.func,
	favorite: React.PropTypes.bool,
};
