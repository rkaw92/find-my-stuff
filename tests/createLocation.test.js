'use strict';

const restify = require('restify');
const client = restify.createJsonClient({
	url: 'http://[::1]:3343'
});
const assert = require('assert');

const locationUUID = '5f040dae-f26f-45f2-bbb1-627e611d0a63';

client.post('/locations', {
	ID: locationUUID,
	name: 'Niszczarka',
	description: 'Podobno działa tylko na papier, więc tam trzymam metal'
}, function(err, req, res, item) {
	assert.ifError(err);
	console.log('* Location created:');
	console.log(JSON.stringify(item, null, '\t'));
});
