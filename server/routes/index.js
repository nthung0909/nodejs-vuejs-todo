'use strict';
const accessRoute = require('./access.route');
const userRoute = require('./users.route');

module.exports = (app) => {
    app.get('/', (req, res) => {res.send('test ok')});
    app.use('/access', accessRoute);
    app.use('/users', userRoute);
};