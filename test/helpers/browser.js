require('babel-register')();

// creating local storage
const LocalStorage = require('node-localstorage').LocalStorage;
global.localStorage = new LocalStorage('./test/localstorage');

// creating global objects: document, window etc.
const jsdom = require('jsdom').jsdom;

let exposedProperties = ['window', 'navigator', 'document', 'localStorage'];

require("jsdom").defaultDocumentFeatures = {
	FetchExternalResources: ["script"],
	ProcessExternalResources: false
};

global.document = jsdom('<html><head><script src="https://maps.googleapis.com/maps/api/js"></script></head><body></body></html>');

global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
	if (typeof global[property] === 'undefined') {
		exposedProperties.push(property);
		global[property] = document.defaultView[property];
	}
});
