import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

// import components
import LocationItem from './../assets/js/components/LocationItem';

describe('Testing component: LocationItem', () => {

	const onClick = sinon.spy();

	let wrapper;

	let testPlaceOne = {
		address: 'Kiev',
		active: true,
		timestamp: Date.now(),
	};

	beforeEach(() => {
		wrapper = mount(<LocationItem
			address={testPlaceOne.address}
			timestamp={testPlaceOne.timestamp}
			active={testPlaceOne.active}
			onClick={onClick}
		/>);
	});

	it('Contain a button (clickable card)', () => {
		wrapper = shallow(<LocationItem/>);
		expect(wrapper.find('button')).to.have.length(1);
	});

	it('calling onClick once', () => {
		wrapper.find('button').simulate('click');
		expect(onClick.calledOnce).to.equal(true);
	});

	it('Test to passing props().active true value', () => {
		expect(wrapper.props().active).to.be.true;
	});

	it('Pass to props().addres value \"Kiev\"', () => {
		expect(wrapper.props().address).to.equal('Kiev');
	});

});