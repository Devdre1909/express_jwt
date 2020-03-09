const express = require('express');
let router = express.Router();

const userService = require('../../../services/v1/user/user');
const authClientRequest = require('../../../middlewares/authgaurd');

router.get('/:userId', authClientRequest.authClientToken, userService.getUserDetails);

module.exports = router;