import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

// import components
import LocationList from './../assets/js/components/LocationList';
import LocationItem from './../assets/js/components/LocationItem';

describe('Testing component: LocationList', () => {
	
	const onClick = sinon.spy();

	let wrapper;

	const testPlaceOne = {
		address: 'Kiev',
		key: '1',
		active: true,
		timestamp: Date.now(),
		onClick
	};

	const testPlaceTwo = {
		address: 'Boston',
		key: '2',
		active: false,
		timestamp: Date.now(),
		onClick
	};

	const testPlaceThree = {
		address: 'Riga',
		key: '3',
		active: false,
		timestamp: Date.now(),
		onClick
	};

	beforeEach(() => {
		wrapper = mount(<LocationList
					locations={[testPlaceOne, testPlaceTwo, testPlaceThree]}
					activeLocationAddress={testPlaceOne.address}
					onClick={onClick}
				/>);
	});

	it('Must have 3 <LocationItem/> components ', () => {
		
	});

	it('Call on click once in LocationItem component', () => {
		wrapper.find('LocationItem').first().simulate('click');
		expect(onClick.calledOnce).to.equal(true);
	});

});