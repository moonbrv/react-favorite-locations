import React from 'react';

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			value: e.target.value,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onSearch(this.state.value);
		document.getElementById('address').blur();
		this.setState({
			value: '',
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} id="geocoding_form" className="form-horizontal">
				<div className="form-group">
					<div className="col-xs-12 col-md-6 col-md-offset-3">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								id="address"
								placeholder="Find a location..."
								value={this.state.value}
								onChange={this.handleChange}
							/>
							<span className="input-group-btn">
								<span className="glyphicon glyphicon-search" aria-hidden="true" />
							</span>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

Search.propTypes = {
	onSearch: React.PropTypes.func,
};
