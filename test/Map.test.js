import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';

// import components
import Map from './../assets/js/components/Map';

describe('Testing component: Map', () => {
	
	let wrapper;
	
	const coord = {
		lat: 50.4501,
		lng: 30.523400000000038,
	};

	beforeEach(() => {
		wrapper = mount(<Map
			lat={coord.lat}
			lng={coord.lng}
		/>);
	});

	it('Must be rendered', () => {
		expect(wrapper.find('#map')).to.have.length(1);
	});
	
	it('Must have a lat type of number', () => {
		expect(wrapper.props().lat).to.be.number;
	});

	it('Must have a lng type of number', () => {
		expect(wrapper.props().lng).to.be.number;
	});

});