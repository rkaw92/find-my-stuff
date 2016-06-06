'use strict';

const restify = require('restify');
const client = restify.createJsonClient({
	url: 'http://[::1]:3343'
});
const assert = require('assert');

const itemUUID = 'baa0b8d7-0c8f-47bb-bc29-5f65a67e1ce7';

client.post('/items', {
	ID: itemUUID,
	name: 'Klucze do samochodu',
	description: 'Pęk kluczy do samochodu ALFA ROMEO'
}, function(err, req, res, item) {
	assert.ifError(err);
	console.log('* Item created:');
	console.log(JSON.stringify(item, null, '\t'));
});
