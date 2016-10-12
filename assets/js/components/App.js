// import libraries
import React from 'react';
import gmaps from 'gmaps';

// import components
import Search from './Search';
import Map from './Map';
import CurrentLocation from './CurrentLocation';
import LocationList from './LocationList';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		let favorites = [];
		if (localStorage.favorites) {
			favorites = JSON.parse(localStorage.favorites);
		}
		this.state = {
			favorites,
			currentAddress: 'Киев, Украина, 02000',
			mapCoordinates: {
				lat: 50.4501,
				lng: 30.523400000000038,
			},
		};

		this.addToFavorites = this.addToFavorites.bind(this);
		this.removeFromFavorites = this.removeFromFavorites.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.isAddressInFavorites = this.isAddressInFavorites.bind(this);
		this.searchForAddress = this.searchForAddress.bind(this);
	}

	addToFavorites(address) {
		const favorites = this.state.favorites;
		favorites.push({
			address,
			timestamp: Date.now(),
		});
		this.setState({
			favorites,
		});
		localStorage.favorites = JSON.stringify(favorites);
	}

	removeFromFavorites(address) {
		const favorites = this.state.favorites;
		let index = -1;
		for (let i = 0; i < favorites.length; i += 1) {
			if (favorites[i].address === address) {
				index = i;
				break;
			}
		}
		if (index !== -1) {
			favorites.splice(index, 1);
			this.setState({
				favorites,
			});
			localStorage.favorites = JSON.stringify(favorites);
		}
	}

	toggleFavorite(address) {
		if (this.isAddressInFavorites(address)) {
			this.removeFromFavorites(address);
		} else {
			this.addToFavorites(address);
		}
	}

	isAddressInFavorites(address) {
		const favorites = this.state.favorites;
		for (let i = 0; i < favorites.length; i += 1) {
			if (favorites[i].address === address) {
				return true;
			}
		}
		return false;
	}

	searchForAddress(address) {
		gmaps.geocode({
			address,
			callback: (result, status) => {
				if (status !== 'OK') {
					return;
				}
				const latlng = result[0].geometry.location;
				this.setState({
					currentAddress: result[0].formatted_address,
					mapCoordinates: {
						lat: latlng.lat(),
						lng: latlng.lng(),
					},
				});
			},
		});
	}

	render() {
		return (
			<div>
				<h1>Enter the name of your favourite location</h1>
				<Search onSearch={this.searchForAddress} />
				<Map
					lat={this.state.mapCoordinates.lat}
					lng={this.state.mapCoordinates.lng}
				/>

				<CurrentLocation
					address={this.state.currentAddress}
					favorite={this.isAddressInFavorites(this.state.currentAddress)}
					onFavoriteToggle={this.toggleFavorite}
				/>

				<LocationList
					locations={this.state.favorites}
					activeLocationAddress={this.state.currentAddress}
					onClick={this.searchForAddress}
				/>
			</div>
		);
	}
}
