const express = require('express');
const router = express.Router();
const accessController = require('../controllers/access.controller');
const {verifyToken} = require('../middlewares/auth');

router.post('/login', accessController.login);
router.post('/logout', verifyToken, accessController.logout);

module.exports = router;