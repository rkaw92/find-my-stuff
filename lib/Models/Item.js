'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
	const Location = require('./Location')(sequelize);
	
	const Item = sequelize.define('Item', {
		ID: {
			type: Sequelize.UUID,
			primaryKey: true
		},
		name: Sequelize.TEXT,
		description: Sequelize.TEXT
	});
	Item.belongsTo(Location, {
		foreignKey: {
			type: Sequelize.UUID,
			name: 'location'
		}
	});
	return Item;
};
