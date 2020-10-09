const Sequielize = require('sequelize');
const dbcConfig = require('../config/database');

const Style = require('../models/Style');
const Equivalence = require('../models/Equivalence');

const connection = new Sequielize(dbcConfig);

Style.init(connection);
Equivalence.init(connection);

Style.associate(connection.models)
Equivalence.associate(connection.models)

module.exports = connection;