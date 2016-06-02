import {Component} from 'react';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}
	handleChange = (e) => {
		this.setState({
			value: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		// When the form is submitted, call the onSearch callback that is passed to the component
		this.props.onSearch(this.state.value);
		// Unfocus the text input field
		this.refs.userInput.blur();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} id='geocoding_form' className='form-horizontal'>
				<div className='form-group'>
					<div className='col-xs-12 col-md-6 col-md-offset-3'>
						<div className='input-group'>
							<input type='text' className='form-control' id='address' 
							placeholder='Find a location...' value={this.state.value}
							onChange={this.handleChange} ref='userInput' />
							<span className='input-group-btn'>
								<span className='glyphicon glyphicon-search' aria-hidden='true'></span>
							</span>
						</div>
					</div>
				</div>
			</form>
		)
	}
}