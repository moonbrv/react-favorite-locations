import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

// import components
import App from './../assets/js/components/App';
import CurrentLocation from './../assets/js/components/CurrentLocation';
import LocationList from './../assets/js/components/LocationList';
import Map from './../assets/js/components/Map';
import Search from './../assets/js/components/Search';

describe('Testing component: App', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App/>);
	});

	it('contains <CurrentLocation/> component', () => {
		expect(wrapper.find(CurrentLocation)).to.have.length(1);
	});

	it('contains <LocationList/> component', () => {
		expect(wrapper.find(LocationList)).to.have.length(1);
	});

	it('contains <Map/> component', () => {
		expect(wrapper.find(Map)).to.have.length(1);
	});

	it('contains <Search/> component', () => {
		expect(wrapper.find(Search)).to.have.length(1);
	});

	it('contains input element', () => {
		wrapper = mount(<App/>);
		expect(wrapper.find('input')).to.have.length(1);
	});

	it('contains .glyphicon', () => {
		wrapper = mount(<App/>);
		expect(wrapper.find('.glyphicon')).to.have.length(2);
	});

});