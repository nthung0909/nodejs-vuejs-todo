const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const {verifyToken} = require('../middlewares/auth')

router.use(verifyToken);
router.get('/', userController.getUsers);
router.get('/:id([-a-zA-z0-9]{3})', userController.getUserById);

module.exports = router;