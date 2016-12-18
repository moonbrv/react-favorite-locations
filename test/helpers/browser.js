require('babel-register')();

console.log('====== START TEST ==========')

const fs = require('fs');
const path = require('path');

// creating local storage
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  global.localStorage = new LocalStorage('./scratch');
}

// creating global objects: document, window etc.
const jsdom = require('jsdom').jsdom;

let exposedProperties = ['window', 'navigator', 'document', 'localStorage'];

global.document = jsdom('<html><head></head><body><script src="https://maps.googleapis.com/maps/api/js"></script></body></html>');


global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
	if (typeof global[property] === 'undefined') {
		exposedProperties.push(property);
		global[property] = document.defaultView[property];
	}
});
