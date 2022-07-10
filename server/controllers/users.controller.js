'use strict';
const {Users} = require('../models');

async function getUsers(req, res) {
    try {
        const users = await Users.getUsers();
        return res.json({
            status: 200,
            data: users
        })
    } catch (e) {
        throw e;
    }
}

function getUserById(req, res) {
    try {
        console.log('get user byId work!');
        res.send('user id ok');
    } catch (e) {
        throw e;
    }
}

module.exports = {getUsers, getUserById};