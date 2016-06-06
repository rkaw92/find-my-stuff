'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
	return sequelize.define('Location', {
		ID: {
			type: Sequelize.UUID,
			primaryKey: true
		},
		name: Sequelize.TEXT,
		description: Sequelize.TEXT
	});
};
