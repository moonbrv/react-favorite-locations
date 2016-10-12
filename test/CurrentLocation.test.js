import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

// import components
import CurrentLocation from './../assets/js/components/CurrentLocation';

describe('Testing component: CurrentLocation', () => {
	
	let testPlaceOne = {
		address: 'Kiev',
		favorite: true,
	};

	const onClick = sinon.spy();

	describe('Testing DOM element render', () => {

		it('Have a .glyphicon', () => {
			const wrapper = shallow(<CurrentLocation/>)
			expect(wrapper.find('.glyphicon')).to.have.length(1); 
		});

	});

	describe(`Testing component: CurrentLocation (with props of {address: ${testPlaceOne.address}, favorite: ${testPlaceOne.favorite}})`, () => {
		let wrapper;

		beforeEach(() => {
			wrapper = mount(
				<CurrentLocation 
					address={testPlaceOne.address}
					favorite={testPlaceOne.favorite}
					onFavoriteToggle={onClick}
				/>
			);	
		});

		it('Have a property favorite equal true', () => {
			expect(wrapper.props().favorite).to.be.true;
		});

		it('Call onFavoriteToggle once', () => {
			wrapper.find('.glyphicon').simulate('click');
			expect(onClick.calledOnce).to.equal(true);
		});

		it('Location addres must be Kiev', () => {
			expect(wrapper.props().address).to.equal('Kiev');
		});

	});

});