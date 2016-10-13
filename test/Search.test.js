import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

// import components
import Search from './../assets/js/components/Search';

describe('Testing component: Search', () => {
	
	let wrapper;

	const onSubmit = sinon.stub();

	beforeEach(() => {
		wrapper = mount(<Search onSearch={onSubmit} />)
	});

	it('Have a form', () => {
		expect(wrapper.find('form')).to.have.length(1);
	});
});