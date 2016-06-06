'use strict';

const when = require('when');
const sequelize = new (require('sequelize'))('findmystuff', 'findmystuff', 'findmystuff', {
	host: '::1',
	dialect: 'postgres',
	pool: { min: 0, max: 5, idle: 5000 }
});
const restify = require('restify');
const server = restify.createServer();
const Item = require('../lib/Models/Item')(sequelize);
const Location = require('../lib/Models/Location')(sequelize);

// ### Routing ###

function errorHandler(req, res, next) {
	return function(error) {
		next(error);
	};
}

server.use(restify.bodyParser());

server.get('/items', function(req, res, next) {
	Item.findAll({
		include: [ Location ]
	}).then(function(items) {
		res.send(items);
		next();
	}, errorHandler(req, res, next));
});

server.post('/items', function(req, res, next) {
	const data = req.body;
	const item = Item.build(data);
	
	item.save().then(function(savedItem) {
		res.send(savedItem);
		next();
	}, errorHandler(req, res, next));
});

server.get('/locations', function(req, res, next) {
	Location.findAll().then(function(locations) {
		res.send(locations);
		next();
	}, errorHandler(req, res, next));
});

server.post('/locations', function(req, res, next) {
	const data = req.body;
	const location = Location.build(data);
	
	location.save().then(function(savedLocation) {
		res.send(savedLocation);
		next();
	}, errorHandler(req, res, next));
});

when(sequelize.sync()).done(function() {
	console.log('* Schema sync done - launching app!');
	server.listen(3343);
	server.on('listening', function() {
		console.log('* Server listening on [::1]:3343');
	});
});
