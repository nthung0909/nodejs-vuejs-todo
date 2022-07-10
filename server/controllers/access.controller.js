'use strict';
const bcrypt = require('bcrypt');
const config = require('../configs/config');
const bcryptConfig = config['bcrypt'];
const {Users, RefreshTokens} = require('../models');
const Auth = require('../middlewares/auth');

async function login(req, res) {
    try {
        const {username, password} = req.body;
        const user = await Users.getUsersByParams({username});
        if(!user.length) {
            return res.json({
                status: 500,
                message: 'User not found'
            });
        }
        const checkPsw = await bcrypt.compare(password, user[0].password);
        if(!checkPsw) {
            return res.json({
                status: 500,
                message: 'Username or password not correct'
            });
        }
        const {token, refreshToken} = await Auth.generateToken({username});

        /*** save refresh token **/
        await RefreshTokens.insertToken({userId: user[0].userId, refreshToken});

        /*** save req.user ***/
        delete user[0].password;
        req.user = user[0];

        /*** set cookie ***/
        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true
        });

        res.json({
            status: 200,
            message: 'Login successfully!',
            data: {token, refreshToken}
        })
    } catch (e) {
        throw e;
    }
}

async function logout(req, res){
    try{
        const {user = {}} = req;
        if(!user) {
            return res.json({
                status: 500,
                message: 'User not login yet!'
            })
        }
        const {userId} = user;
        /*** delete refresh token ***/
        await RefreshTokens.deleteTokenByUserId(userId);

        /*** clear cookie ***/
        res.clearCookie('token');
        res.clearCookie('refreshToken');

        res.json({
            status: 200,
            message: 'logout successfully!'
        })
    } catch (e) {
        throw e;
    }
}

module.exports = {login, logout};