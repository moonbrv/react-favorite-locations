import React from 'react';
import {shallow, mount} from 'enzyme';
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
		wrapper = mount(<Map/>);
	});

});