const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../configs/config');
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const mysqlConfig = config[env].mysql;
const db = {};

const sequelize = new Sequelize(
    mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, mysqlConfig
);

sequelize
    .authenticate()
    .then(() => {
        console.log('=======Connection database has been established successfully======');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

fs.readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const modelPath = path.join(__dirname, file);
        const model = require(modelPath)(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
