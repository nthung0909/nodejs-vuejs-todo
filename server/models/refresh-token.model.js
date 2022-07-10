const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const refreshTokens = sequelize.define('RefreshTokens', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    }, {
        // sequelize,
        tableName: 'tbl_refresh_token',
        timestamps : false
    });

    refreshTokens.associate = (models) => {

    };

    refreshTokens.getTokensByParams = (params) => {
        return refreshTokens.find({where: params});
    };

    refreshTokens.getTokenByUserId = (id) => {
        return refreshTokens.find({where: {userId: id}});
    };

    refreshTokens.insertToken = (data) => {
        return refreshTokens.create(data);
    }

    refreshTokens.deleteTokenByUserId = (userId) => {
        return refreshTokens.destroy({
            where: {userId}
        })
    }

    return refreshTokens;
}