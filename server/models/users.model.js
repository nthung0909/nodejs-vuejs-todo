const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // sequelize,
        tableName: 'tbl_users',
        timestamps : false
    });

    Users.associate = (models) => {

    };

    Users.getUsers = (params) => {
        return Users.findAll();
    };

    Users.getUsersByParams = (params) => {
        return Users.findAll({where: params});
    };

    Users.getUserById = (id) => {
        return Users.findOne(id);
    };

    return Users;
}